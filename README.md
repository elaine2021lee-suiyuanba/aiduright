# AiduRight

Find government benefits you qualify for.

## About

AiduRight helps people discover government benefits, subsidies, and assistance programs they may be eligible for. Answer a few simple questions and get matched to all relevant programs.

## Features

- Simple questionnaire (no confusing forms)
- Automatic matching to all eligible programs
- Step-by-step application instructions
- Mobile-friendly design
- No account required
- Built-in AI assistant to explain confusing terms (EN/ES/中文)

## AI assistant

Every questionnaire question has a **"Need help? Ask AI"** link that opens a chat
(available in English, Spanish, and Chinese). It explains benefits terminology,
helps people work out which documents they need, and explains what a program's
requirements are.

It deliberately **does not** tell anyone whether they personally qualify or
estimate a benefit amount — it explains how the rules work and points people to
the questionnaire results, the official program, and 211.

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

Then set two things:

1. **`ALLOWED_ORIGINS`** in `worker/wrangler.toml` — the origins allowed to call
   the Worker. An empty value accepts any origin, which is fine locally and
   unsafe in production.
2. **The endpoint URL** at the top of `chat.js` — `wrangler deploy` prints the
   `*.workers.dev` URL to use.

Strongly recommended before going live, or the endpoint is a free Claude proxy
for anyone who finds the URL:

```bash
npx wrangler kv namespace create AIDURIGHT_RATE_LIMIT
```

Paste the returned id into the commented-out `[[kv_namespaces]]` block in
`wrangler.toml` and redeploy. Without it, per-IP rate limiting is skipped.

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
per conversation, and 2000 characters per message. Chat transcripts live in
browser memory only — they are discarded when the modal closes and never
written to `localStorage` or sent anywhere but the Worker.

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
