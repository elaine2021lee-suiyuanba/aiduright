// AiduRight — data verification
//
// Checks every benefit in benefits.js for:
//   1. Link rot   — does the official URL still respond?
//   2. Staleness  — has the entry been re-verified recently enough?
//
// Writes a Markdown report to data-report.md and prints a summary.
// Exit code 1 if any BROKEN links or STALE entries are found (0 otherwise),
// so CI can open an issue only when there is something to act on.
//
// Usage: node verify-data.mjs
// No dependencies — uses Node's built-in fetch (Node 18+).

import fs from 'fs';

const STALE_MONTHS = 12;       // re-verify at least once a year (FPL updates every January)
const CONCURRENCY = 12;
const TIMEOUT_MS = 12000;
const UA = 'Mozilla/5.0 (compatible; AiduRightDataCheck/1.0; +https://github.com/)';

// ---- Load the data (benefits.js has no exports; eval its globals) ----
const src = fs.readFileSync(new URL('./benefits.js', import.meta.url), 'utf8');
eval(src.replace(/\bconst /g, 'globalThis.')); // defines globalThis.benefits, categories, etc.
const benefits = globalThis.benefits;

// ---- URL liveness ----
async function checkUrl(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const res = await fetch(url, {
        method,
        redirect: 'follow',
        signal: ctrl.signal,
        headers: { 'User-Agent': UA, 'Accept': '*/*' }
      });
      clearTimeout(t);
      const s = res.status;
      if (s >= 200 && s < 400) return { state: 'ok', status: s };
      // Many .gov sites block automated HEAD/GET — treat as "reachable, check manually"
      if ([401, 403, 405, 406, 429].includes(s)) return { state: 'blocked', status: s };
      // A definitive 4xx/5xx (server answered) means the path is genuinely wrong.
      if (method === 'GET') return { state: 'broken', status: s };
    } catch (err) {
      // Couldn't connect at all: could be a dead site OR a site that blocks CI.
      // Ambiguous — surface as a warning, not a hard failure.
      if (method === 'GET') return { state: 'unreachable', status: err.name === 'AbortError' ? 'timeout' : 'network' };
    }
  }
  return { state: 'unreachable', status: 'unknown' };
}

function monthsSince(dateStr) {
  if (!dateStr) return Infinity;
  const then = new Date(dateStr);
  if (isNaN(then)) return Infinity;
  return (Date.now() - then.getTime()) / (1000 * 60 * 60 * 24 * 30.44);
}

// ---- Run checks with limited concurrency ----
async function run() {
  const results = [];
  let i = 0;
  async function worker() {
    while (i < benefits.length) {
      const b = benefits[i++];
      const link = await checkUrl(b.url);
      const age = monthsSince(b.verified);
      results.push({
        id: b.id,
        url: b.url,
        link,
        verified: b.verified || null,
        stale: b.verified != null && age > STALE_MONTHS,
        unverified: b.verified == null
      });
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  results.sort((a, b) => a.id.localeCompare(b.id));

  const broken = results.filter(r => r.link.state === 'broken');
  const blocked = results.filter(r => r.link.state === 'blocked');
  const unreachable = results.filter(r => r.link.state === 'unreachable');
  const ok = results.filter(r => r.link.state === 'ok');
  const stale = results.filter(r => r.stale);
  const unverified = results.filter(r => r.unverified);

  const today = new Date().toISOString().slice(0, 10);
  const L = [];
  L.push(`# AiduRight data check — ${today}`, '');
  L.push(`- Programs checked: **${results.length}**`);
  L.push(`- ✅ URLs OK: ${ok.length}`);
  L.push(`- ⚠️ URLs blocked (bot protection — verify manually): ${blocked.length}`);
  L.push(`- 🔌 URLs unreachable (blocked-to-CI or down — spot-check): ${unreachable.length}`);
  L.push(`- ❌ URLs broken (wrong path): **${broken.length}**`);
  L.push(`- 🕒 Stale (not re-verified in ${STALE_MONTHS} months): **${stale.length}**`);
  L.push(`- ❓ Never verified (backlog): ${unverified.length}`, '');

  if (broken.length) {
    L.push('## ❌ Broken URLs — the path returned 4xx/5xx, fix these', '');
    broken.forEach(r => L.push(`- \`${r.id}\` — ${r.url} — status: ${r.link.status}`));
    L.push('');
  }
  if (stale.length) {
    L.push(`## 🕒 Stale entries (re-verify)`, '');
    stale.forEach(r => L.push(`- \`${r.id}\` — last verified ${r.verified}`));
    L.push('');
  }
  if (unreachable.length) {
    L.push('## 🔌 Unreachable (could not connect — often CI blocking, spot-check)', '');
    unreachable.forEach(r => L.push(`- \`${r.id}\` — ${r.url} — ${r.link.status}`));
    L.push('');
  }
  if (blocked.length) {
    L.push('## ⚠️ Blocked (likely fine, spot-check manually)', '');
    blocked.forEach(r => L.push(`- \`${r.id}\` — ${r.url} — status: ${r.link.status}`));
    L.push('');
  }
  if (unverified.length) {
    L.push('<details><summary>❓ Never-verified backlog</summary>', '');
    L.push(unverified.map(r => `\`${r.id}\``).join(', '));
    L.push('', '</details>', '');
  }

  const report = L.join('\n');
  fs.writeFileSync(new URL('./data-report.md', import.meta.url), report);
  console.log(report);

  // Fail (exit 1) only on actionable problems: broken links or stale data.
  const problems = broken.length + stale.length;
  if (problems > 0) {
    console.error(`\n${problems} actionable problem(s) found.`);
    process.exit(1);
  }
  console.log('\nNo broken links or stale entries. ✅');
}

run().catch(err => { console.error(err); process.exit(1); });
