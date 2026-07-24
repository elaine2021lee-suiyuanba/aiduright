# Maintaining AiduRight's benefit data

Benefit programs change: dollar amounts and Federal Poverty Level (FPL) limits
update every year, and programs occasionally get renamed or shut down (e.g.
ACP, My Health LA, and California LIHWAP all ended and were removed). Keeping
the data trustworthy is ongoing work — this file explains how.

## The `verified` field

Every entry in `benefits.js` has a `verified` field:

```js
{ id: 'calfresh', verified: '2026-07-23', ... }   // re-verified on this date
{ id: 'liheap',   verified: null, ... }           // never verified — backlog
```

When you confirm an entry's URL, eligibility rules, and dollar figures against
the official source, set `verified` to today's date (`YYYY-MM-DD`).

## The check script

```bash
node verify-data.mjs
```

No dependencies (uses Node 18+ built-in `fetch`). It reports, per program:

- ✅ **OK** — URL responds
- ⚠️ **Blocked** — URL returned 403/429 etc.; usually just bot protection, spot-check by hand
- ❌ **Broken** — dead link (404/5xx/timeout) — fix these
- 🕒 **Stale** — not re-verified in over 12 months — re-verify
- ❓ **Never verified** — backlog of entries with `verified: null`

It writes `data-report.md` and exits `1` when there are broken links or stale
entries (so CI can act on it).

## Automated monthly check

`.github/workflows/verify-data.yml` runs the script on the 1st of each month
(and on demand from the **Actions** tab). If it finds broken links or stale
entries, it **opens a GitHub Issue** with the report so you get notified.

## Annual tasks (every January)

1. Update the FPL table in `benefits.js` (`fplMonthly`) with the new HHS
   guidelines, and bump the comment's year.
2. Skim the stale/backlog list from the report and re-verify a batch.
3. Remove any program that has ended; adjust amounts that changed.

## Verifying an entry

For each program confirm against the **official** site:
1. The URL still resolves and is the right page.
2. The program is still active (not renamed/ended).
3. Income limits (% FPL), age, and dollar figures are current.
4. Update `verified` to today's date.
