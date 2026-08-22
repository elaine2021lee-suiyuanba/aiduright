# AiduRight

Find government benefits you qualify for. — **https://aiduright.com**

## About

AiduRight helps people discover government benefits, subsidies, and assistance programs they may be eligible for. Answer a few simple questions and get matched to all relevant programs.

## Features

- Simple questionnaire (no confusing forms)
- Automatic matching to all eligible programs
- Step-by-step application instructions
- Mobile-friendly design
- No account required
- Aidu, a built-in assistant that explains confusing terms and reads photos of
  letters and forms (EN/ES/中文)

## Aidu, the assistant

Every questionnaire question has a **"Need help? Ask Aidu"** link that opens a
chat (available in English, Spanish, and Chinese). It explains benefits
terminology, helps people work out which documents they need, and explains what
a program's requirements are.

It deliberately **does not** tell anyone whether they personally qualify or
estimate a benefit amount — it explains how the rules work and points people to
the questionnaire results, the official program, and 211. Asked what it is, it
says plainly that it's an AI, not a caseworker.

### Photos

Much of what people need explained arrives as county mail, so the chat takes
pictures as well as questions: a camera button on phones, a picker everywhere,
plus paste and drag-and-drop. Nothing is stored as a file on either end — the
image is resized in a canvas, held as base64 in memory, sent to the Worker, and
dropped when the modal closes, the same rule the transcript follows.

Photos are redrawn at 2000px on the long edge before sending. A phone photo is
several megabytes and more pixels than the model reads, and the small print on
a benefits letter still has to survive the resize — that's what set the number.
Re-encoding as JPEG also sidesteps HEIC, which the API won't take.

A reminder to cover SSNs and account numbers sits with the thumbnails, where
it's on screen at the moment someone is about to send a letter with their number
printed on it. Aidu is told not to read those digits back.

### Why there's a Worker

The site is static, so it cannot hold an API key: anything shipped to the browser
is readable by every visitor. `worker/` is a small Cloudflare Worker that holds
`ANTHROPIC_API_KEY` and proxies chat requests to the Claude API. It is the only
server-side piece; the site itself still deploys to GitHub Pages unchanged.

### Deploying the Worker

```bash
cd worker
npm install
npx wrangler secret put ANTHROPIC_API_KEY     # paste the key when prompted
npx wrangler deploy
```

Two settings back this:

1. **`ALLOWED_ORIGINS`** in `worker/wrangler.toml` — a comma-separated list of
   the origins allowed to call the Worker, currently `https://aiduright.com`,
   its `www` form, and the old `github.io` address. An empty value accepts any
   origin: fine locally, an open Claude proxy in production.
2. **The endpoint URL** at the top of `chat.js` — `wrangler deploy` prints the
   `*.workers.dev` URL to use. It doesn't change when the site's domain does.

> ⚠️ **Changing the site's domain silently breaks the chat.** The browser sends
> its origin with every request and the Worker checks it against that list, so a
> new domain is refused with a 403 until it's added — and because CORS hides the
> response, the page reports only "I can't reach the assistant", which looks
> like a network fault and isn't. Add the new origin and deploy the Worker
> *before* switching the domain. The same applies to subdomains and preview
> environments.

Per-IP rate limiting needs a KV namespace, already created and wired into the
`[[kv_namespaces]]` block in `wrangler.toml`. To stand up a fresh deployment:

```bash
npx wrangler kv namespace create AIDURIGHT_RATE_LIMIT
```

Put the returned id in that block. Without the binding the Worker still runs —
it just skips throttling, which leaves the endpoint free for anyone who finds
the URL.

### Local development

```bash
cd worker && npx wrangler dev          # serves the Worker on :8787
```

Then load the site with the endpoint pointed at it — add this above the
`chat.js` tag in `index.html` while developing:

```html
<script>window.AIDURIGHT_AI_ENDPOINT = 'http://127.0.0.1:8787';</script>
```

### Costs and limits

Model is `claude-opus-5`, capped at 1024 output tokens per reply, 20 messages
per conversation, 2000 characters per text block, and 2 images per message at
3.5MB each. The browser enforces the limits it can; the Worker re-checks all of
them, because those caps are what stop a hand-written POST from running up the
bill.

Chat transcripts live in browser memory only — discarded when the modal closes,
never written to `localStorage` or sent anywhere but the Worker. Photos are held
the same way.

Photos ride along on every follow-up turn, so a conversation with an image in it
caches through its newest turn and reads the picture back at a tenth of the
price instead of paying full freight each time. Text-only chats skip the cache
breakpoint: with nothing bulky to re-send, the cache-write premium isn't worth
paying.

### Watching what it costs

Every answered question logs one line of numbers — no question text, no image
data, no IP:

```bash
cd worker && npx wrangler tail        # live
```

```json
{"kind":"usage","model":"claude-opus-5","in":892,"out":143,"cached":780,
 "cache_write":0,"images":1,"turns":3,"lang":"zh","stop":"end_turn","ms":4210}
```

`cached` is the field to watch. If it stays at 0 on follow-up turns in a
conversation that has a photo in it, prompt caching isn't working and every
question about that photo is being paid for at full price.

`wrangler tail` only shows what happens while it's open. Turn on Workers Logs in
the Cloudflare dashboard to keep a history worth looking back at.

## Categories

- Healthcare (Medicare, Medi-Cal, etc.)
- Food Assistance (CalFresh/SNAP)
- Cash Assistance (SSI, TANF)
- Housing (Section 8, rental assistance)
- Utilities (LIHEAP)
- Jobs & Training

## Disclaimer

AiduRight is for informational purposes only. This tool provides preliminary estimates and does not constitute official eligibility determination. Always verify with official program sources.

## License

MIT
