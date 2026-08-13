// AiduRight — AI assistant proxy (Cloudflare Worker)
//
// The site itself is static (GitHub Pages), so it cannot hold an API key.
// This Worker is the only place ANTHROPIC_API_KEY exists: the browser posts a
// chat transcript here, the Worker calls Claude and streams the reply back.
//
// Bindings (see wrangler.toml):
//   ANTHROPIC_API_KEY  secret   — wrangler secret put ANTHROPIC_API_KEY
//   ALLOWED_ORIGINS    var      — comma-separated origin allowlist
//   RATE_LIMIT_KV      KV       — optional; per-IP throttling is skipped without it

import Anthropic from '@anthropic-ai/sdk';

const MODEL = 'claude-opus-5';

// Request limits. These bound both abuse and cost.
const MAX_TURNS = 20;          // messages in one transcript
const MAX_CHARS = 2000;        // per text block
const MAX_IMAGES = 2;          // per message
const MAX_IMAGE_BYTES = 3_500_000;  // decoded; the API's own ceiling is 5MB
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_OUTPUT_TOKENS = 1024;
const RATE_LIMIT = 20;         // requests...
const RATE_WINDOW = 60;        // ...per this many seconds, per IP

// Stable across every request, so it sits alone in a cached system block.
// Anything that varies per question goes in a second, uncached block below.
const SYSTEM_PROMPT = `You are Aidu, the assistant on AiduRight. AiduRight is a free, private website that helps people in the United States — mostly California — find government benefits they may qualify for: CalFresh (SNAP), Medi-Cal, Medicare, SSI, housing assistance, LIHEAP, and similar programs.

People come to you mid-questionnaire, usually because a question used a word they don't recognize, or they're unsure what counts, or they don't know which documents they'll need. Many are stressed, short on time, and have already been through confusing government forms. Your job is to be the knowledgeable friend who explains things plainly.

WHAT YOU DO
- Explain benefits terminology in everyday words: "household size", "gross vs. net income", "federal poverty level", "categorical eligibility", "asset limit", "qualified non-citizen".
- Explain what a question is actually asking and what commonly counts or doesn't.
- Help people figure out what documents they'll need to apply, and suggest what to do when they don't have one.
- Explain what a program's requirements ARE, in general terms.
- Read photos people send you — a letter from a county office, a notice, a form, a screenshot — and say plainly what it is, what it's asking for, and what the next step is. Government mail is written badly on purpose-adjacent grounds; your job is to translate it. If part of the photo is too blurry or cut off to read, say which part and ask for another picture of just that piece.

WHO YOU ARE
If someone asks, you're Aidu, an AI assistant built for AiduRight. Say so plainly. You are not a caseworker, not a government employee, and not a lawyer, and you never imply otherwise.

THE ONE HARD LIMIT
Never tell someone whether they personally qualify, and never estimate their benefit amount. You explain how rules work; you do not apply them to a person. If asked "do I qualify?" or "how much would I get?", say plainly that you can't determine that, explain the general rule so they understand what matters, and point them to finishing the AiduRight questionnaire and then confirming with the official program or by calling 211. Do not hedge your way into an implied answer — no "it sounds like you'd probably be eligible".

PRIVACY
The user has been told not to share personal information. If they include an SSN, a bank account number, an exact income figure, or a full address, don't repeat it back. Gently note they don't need to share that here, then answer the general question they were getting at.

The same goes double for photos, which capture whatever happened to be on the page. If a picture shows an SSN, a bank or case number, or a full address, do not read it back, quote it, or include it in a summary — work around it. Say once, kindly and briefly, that they can cover those parts before sending a picture, then get on with helping. Don't lecture, and don't refuse to help with the rest of the document over it.

HOW YOU WRITE
- Answer in the same language the user writes in. If they switch languages, switch with them.
- Short: two to four sentences for most questions. Use a short bulleted list for documents or multi-part answers.
- Plain language, roughly an 8th-grade reading level. If you must use an official term, define it in the same breath.
- Warm and direct. No bureaucratic hedging, no "I'd be happy to assist you with that", no apologising for what you can't do, no reminders that you're an AI.
- Lead with the answer. Don't restate their question first.
- Never invent a dollar figure, income limit, percentage, phone number, or URL. If you aren't certain of a current number, say the number changes each year and tell them where to check. 211 (call or text) is the general help line; benefits.gov and the program's own state site are the authoritative sources.
- Don't guess at deadlines or office locations.

If someone raises something outside benefits entirely, answer briefly if you can and steer back to what you're here for.`;

const LANG_NAMES = { en: 'English', es: 'Spanish', zh: 'Simplified Chinese' };

// ---------------------------------------------------------------- CORS

function allowedOrigins(env) {
	return (env.ALLOWED_ORIGINS || '')
		.split(',')
		.map((o) => o.trim())
		.filter(Boolean);
}

function corsHeaders(request, env) {
	const origin = request.headers.get('Origin') || '';
	const allowed = allowedOrigins(env);
	const headers = {
		'Access-Control-Allow-Methods': 'POST, OPTIONS',
		'Access-Control-Allow-Headers': 'Content-Type',
		'Access-Control-Max-Age': '86400',
		Vary: 'Origin',
	};
	// No allowlist configured means local development — echo the origin back.
	if (allowed.length === 0 || allowed.includes(origin)) {
		headers['Access-Control-Allow-Origin'] = origin || '*';
	}
	return headers;
}

function isOriginAllowed(request, env) {
	const allowed = allowedOrigins(env);
	if (allowed.length === 0) return true;
	return allowed.includes(request.headers.get('Origin') || '');
}

function json(body, status, extraHeaders) {
	return new Response(JSON.stringify(body), {
		status,
		headers: { 'Content-Type': 'application/json', ...extraHeaders },
	});
}

// ---------------------------------------------------------------- rate limit

// Fixed-window counter in KV. Skipped entirely when RATE_LIMIT_KV is unbound,
// so the Worker still runs on a bare `wrangler dev`.
async function overRateLimit(request, env) {
	if (!env.RATE_LIMIT_KV) return false;
	const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
	const window = Math.floor(Date.now() / 1000 / RATE_WINDOW);
	const key = `rl:${ip}:${window}`;
	const count = Number((await env.RATE_LIMIT_KV.get(key)) || 0);
	if (count >= RATE_LIMIT) return true;
	// expirationTtl has a 60s floor, which matches our window.
	await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: RATE_WINDOW });
	return false;
}

// ---------------------------------------------------------------- validation

// A turn is either a plain string or an array of text/image blocks. Images are
// re-checked here rather than trusted from the browser: the size and type caps
// are what keep a hand-rolled POST from running up the bill.
function validateContent(content, invalid) {
	if (typeof content === 'string') {
		if (content.trim() === '') return invalid('invalid', 'Empty message.');
		if (content.length > MAX_CHARS) return invalid('message_too_long', 'That message is too long.');
		return null;
	}
	if (!Array.isArray(content) || content.length === 0) return invalid('invalid', 'Empty message.');

	let images = 0;
	for (const block of content) {
		if (!block || typeof block !== 'object') return invalid('invalid', 'Malformed content block.');

		if (block.type === 'text') {
			if (typeof block.text !== 'string') return invalid('invalid', 'Malformed text block.');
			if (block.text.length > MAX_CHARS) return invalid('message_too_long', 'That message is too long.');
		} else if (block.type === 'image') {
			if (++images > MAX_IMAGES) return invalid('too_many_images', 'Too many images in one message.');
			const source = block.source;
			if (!source || source.type !== 'base64' || typeof source.data !== 'string') {
				return invalid('bad_image', 'Malformed image block.');
			}
			if (!IMAGE_TYPES.includes(source.media_type)) {
				return invalid('bad_image', 'Unsupported image type.');
			}
			// base64 carries 3 bytes in every 4 characters.
			if (source.data.length * 0.75 > MAX_IMAGE_BYTES) {
				return invalid('image_too_large', 'That image is too large.');
			}
		} else {
			return invalid('invalid', 'Unsupported content block.');
		}
	}
	return null;
}

// Returns null when the body is usable, otherwise { code, message }. `code` is
// what the browser branches on — the site is multilingual, so the English
// `message` is for logs and non-browser callers only. Codes are shared with the
// stream's error events so the client has one vocabulary to map from.
function validate(body) {
	const invalid = (code, message) => ({ code, message });

	if (!body || typeof body !== 'object') return invalid('invalid', 'Malformed request body.');
	const { messages } = body;
	if (!Array.isArray(messages) || messages.length === 0) return invalid('invalid', 'No messages provided.');
	if (messages.length > MAX_TURNS) return invalid('too_long', 'This conversation is too long. Please start a new one.');
	for (const m of messages) {
		if (!m || (m.role !== 'user' && m.role !== 'assistant')) return invalid('invalid', 'Invalid message role.');
		const bad = validateContent(m.content, invalid);
		if (bad) return bad;
	}
	if (messages[messages.length - 1].role !== 'user') return invalid('invalid', 'Last message must be from the user.');
	return null;
}

// Every follow-up turn re-sends the whole transcript, images included, so one
// photo gets paid for again on each question about it. Marking the newest turn
// caches the conversation up to that point; the next request reads it back at a
// tenth of the price. Text-only chats skip this — the cache-write premium isn't
// worth it when there's nothing bulky to re-send.
function cacheThroughLastTurn(messages) {
	const hasImage = messages.some(
		(m) => Array.isArray(m.content) && m.content.some((b) => b && b.type === 'image')
	);
	if (!hasImage) return messages;

	const out = messages.map((m) => ({ ...m }));
	const last = out[out.length - 1];
	const blocks =
		typeof last.content === 'string'
			? [{ type: 'text', text: last.content }]
			: last.content.map((b) => ({ ...b }));
	blocks[blocks.length - 1] = { ...blocks[blocks.length - 1], cache_control: { type: 'ephemeral' } };
	last.content = blocks;
	return out;
}

// Describes which question the user was looking at, so "what does this mean?"
// resolves to something concrete. Kept out of the cached block since it varies.
function buildContext(body) {
	const lang = LANG_NAMES[body.lang] || LANG_NAMES.en;
	const lines = [`The user's selected interface language is ${lang}. Default to it, but always follow the language they actually write in.`];

	const q = body.question;
	if (q && typeof q.text === 'string' && q.text.trim()) {
		lines.push(`They opened this chat from the questionnaire question: "${q.text.trim().slice(0, 400)}"`);
		if (Array.isArray(q.options) && q.options.length) {
			const opts = q.options
				.filter((o) => typeof o === 'string' && o.trim())
				.slice(0, 12)
				.map((o) => o.trim().slice(0, 80));
			if (opts.length) lines.push(`The answer choices shown were: ${opts.join(' / ')}`);
		}
		lines.push('Assume a vague question like "what does this mean?" refers to that question unless they say otherwise.');
	} else {
		lines.push('They are not on a specific questionnaire question right now.');
	}
	return lines.join('\n');
}

// ---------------------------------------------------------------- handler

export default {
	async fetch(request, env) {
		const cors = corsHeaders(request, env);

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: 204, headers: cors });
		}
		if (request.method !== 'POST') {
			return json({ error: 'Method not allowed.', code: 'invalid' }, 405, cors);
		}
		if (!isOriginAllowed(request, env)) {
			return json({ error: 'Origin not allowed.', code: 'invalid' }, 403, cors);
		}
		if (!env.ANTHROPIC_API_KEY) {
			console.error('ANTHROPIC_API_KEY is not configured on this Worker.');
			return json({ error: 'The assistant is not configured yet.', code: 'failed' }, 500, cors);
		}
		if (await overRateLimit(request, env)) {
			return json({ error: 'Too many questions in a short time. Please wait a minute.', code: 'busy' }, 429, {
				...cors,
				'Retry-After': String(RATE_WINDOW),
			});
		}

		let body;
		try {
			body = await request.json();
		} catch {
			return json({ error: 'Malformed request body.', code: 'invalid' }, 400, cors);
		}

		const invalid = validate(body);
		if (invalid) return json({ error: invalid.message, code: invalid.code }, 400, cors);

		const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
		const messages = cacheThroughLastTurn(body.messages.map((m) => ({ role: m.role, content: m.content })));

		// Newline-delimited JSON so a mid-stream failure is still reportable.
		const encoder = new TextEncoder();
		const stream = new ReadableStream({
			async start(controller) {
				const send = (event) => controller.enqueue(encoder.encode(JSON.stringify(event) + '\n'));
				try {
					const claude = client.beta.messages.stream({
						model: MODEL,
						max_tokens: MAX_OUTPUT_TOKENS,
						// Adaptive thinking at low effort: snappy enough for chat, and
						// avoids the reasoning-leak that thinking:disabled can cause.
						thinking: { type: 'adaptive' },
						output_config: { effort: 'low' },
						// Re-serve on the rare policy decline instead of dead-ending.
						betas: ['server-side-fallback-2026-07-01'],
						fallbacks: 'default',
						system: [
							{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } },
							{ type: 'text', text: buildContext(body) },
						],
						messages,
					});

					for await (const event of claude) {
						if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
							send({ type: 'delta', text: event.delta.text });
						}
					}

					const final = await claude.finalMessage();
					if (final.stop_reason === 'refusal') {
						send({ type: 'error', code: 'refusal' });
					} else {
						send({ type: 'done', truncated: final.stop_reason === 'max_tokens' });
					}
				} catch (err) {
					console.error('Claude request failed:', err);
					const status = err && typeof err.status === 'number' ? err.status : 0;
					send({ type: 'error', code: status === 429 ? 'busy' : 'failed' });
				} finally {
					controller.close();
				}
			},
		});

		return new Response(stream, {
			headers: {
				...cors,
				'Content-Type': 'application/x-ndjson; charset=utf-8',
				'Cache-Control': 'no-store',
			},
		});
	},
};
