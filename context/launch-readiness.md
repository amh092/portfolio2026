# Production Launch — 2026-10-07

## Scope and status

Ahmed requested the necessary work to launch and deploy. Work is on `feature/production-launch`, based on `89a02df`. Local implementation, production publication, and live smoke verification are complete.

The initial launch uses the existing confirmed email, WhatsApp, GitHub, and LinkedIn contact destinations. The inactive form was removed and the contact section rebalanced into heading/copy and contact-method columns. This was the stated launch default while the optional provider question remained unanswered. No visitor data is collected by a form and no mail credentials are required. Full form delivery and additional 3D animation are post-launch features.

Vercel is authenticated as `amh092`. The existing `portfolio` project belongs to `amh092/portfolio`, so it was left intact. Created and linked `amh092s-projects/portfolio2026` for this repository (`amh092/portfolio2026`). Assigned domain: `https://portfolio2026-five-delta.vercel.app`. Configured Next.js, Node.js 24.x, and `NEXT_PUBLIC_SITE_URL` for Production and Preview using this domain. No custom-domain purchase or DNS changes.

## Implemented launch essentials

- Next.js and matching ESLint config pinned to 16.3.8; patched vulnerable transitive packages including Sharp, PostCSS, brace-expansion, js-yaml, nanoid, and source-map-js. Node.js runtime pinned to 24.x, matching local verification and Vercel support.
- Accurate localized canonical URLs, EN/AR/x-default alternatives, Open Graph and Twitter cards, and sanitized WebSite/Person structured data using only approved identity/profile information.
- `/sitemap.xml` with language alternatives and `/robots.txt`. Production uses a stable configured public origin. Preview/development/local builds are noindex and disallow crawling. Disabled automatic next-intl alternate Link headers to avoid disagreement with the stable configured HTML/sitemap URLs.
- Localized 1200×630 sharing PNGs (English 117,597 bytes; Arabic 108,527 bytes), branded SVG icon, 180×180 Apple icon, and replacement branded favicon. Assets use the existing brand, fonts, approved hero headline, and approved service names; both sharing images visually inspected.
- Contrast fixes discovered in launch QA: separate theme-aware accent text, more legible small dim text, and darker primary/skip-link backgrounds behind white text. Decorative glow/accent colors retain their existing tokens.
- `.vercelignore` excludes context/reference files, local env/credential files, and generated/dependency directories from deployment uploads. README now documents the actual build, runtime, domain, and deployment workflow.

## Security result

`npm audit --omit=dev`: **0 vulnerabilities across all severities**.

Full development audit: **5 high entries, 0 critical**, all arising from the one unpatched `braces` advisory through `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`. Latest upstream braces remains affected. These are lint/development dependencies, not deployed runtime dependencies. No incompatible ESLint downgrade or unverified package override was applied; revisit when upstream publishes a fix.

`npm ls --all` reported no missing, invalid, or peer dependency errors; optional WASM packages are listed as extraneous. Temporary evidence: `/tmp/portfolio-launch-production-audit.json`, `/tmp/portfolio-launch-full-audit.json`, `/tmp/portfolio-launch-dependency-tree.json`.

References: [Next.js patch advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j), [remaining development-only braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), [Vercel Node.js versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

## Verification

- Lint and production build pass on Next.js 16.3.8 / Node.js 24.14.1, including TypeScript, both locale pages, robots, and sitemap. Final production candidate was rebuilt with the actual assigned Vercel domain rather than the initial test origin.
- A separately built preview passed HTTP checks for both locale noindex/nofollow metadata, production canonical/language/social URLs, robots disallow, sitemap consistency, and absence of conflicting alternate headers.
- Independent source/HTTP review verified metadata, icons, JSON-LD, contact destinations, and malformed locale 404/noindex behavior. Initial theme screenshot suspicion was a capture-before-paint artifact: independent repeated locale/theme/reload checks and two-frame screenshot settling confirmed correct inherited colors, so no unnecessary theme code change was made.
- All three existing project demo destinations returned HTTP 200 in read-only network checks.
- Final production Chrome QA: **18/18 scenarios**, zero browser exceptions, **zero violations across nine axe scans** (eight EN/AR × dark/light × 1440/390 combinations plus active mobile 3D). Navigation, real mobile menu clicks, locale/hash/theme persistence, keyboard focus, contact links/no form, no-JS previews, unavailable WebGL, failed-model recovery, deferred renderer/model requests, metadata, discovery routes, and all launch image/icon assets pass.
- Final EN desktop dark, EN/AR mobile light contact layouts, and AR desktop dark viewer screenshots inspected. The automated test harness now waits for pointer hit-testing during drawer movement and two animation frames after theme changes.
- Cold-cache mobile Chrome laboratory sample on localhost: FCP **0.820s**, LCP **1.596s**, CLS **0**, at 4× CPU slowdown, 1.6 Mbps download, and 150ms latency. This is a lab sample, not a Lighthouse score or physical-device/field claim.
- Evidence: `/tmp/portfolio-launch-production-results.json`, `/tmp/portfolio-launch-production-*.png`, `/tmp/portfolio-preview-metadata.cjs`, and `/tmp/portfolio-launch-qa.cjs`. The in-app browser execution tool was unavailable; tests used isolated local Chrome profiles. No Firefox/WebKit engine was available, so those checks remain post-launch.
- Live production smoke passed on the public alias: English at 1440px/dark and Arabic at 390px/light, including theme persistence, locale/hash navigation, mobile controls, keyboard interaction, contact links, and on-demand model load/close. Both live axe scans found zero violations; no JavaScript exceptions or failing resource responses. Metadata, structured data, robots, sitemap, images/icons, root redirect, and invalid-route handling pass.
- Live evidence: `/tmp/portfolio-launch-live-final.json`. One initial Arabic test encountered a Chrome CDP context-cleanup timeout; the same case passed in a fresh isolated browser. The report retains this automation retry note.

## Remaining after launch

- Optional working email form with validation, spam controls, and provider configuration.
- Additional model animation and expanded visibility lifecycle work.
- Physical-device and Safari/Firefox checks, native macOS Reduce Motion, and broader field performance data. Automated desktop Chrome emulation does not replace these checks.
- Optional custom domain and updated canonical configuration/redeployment when selected.
- Resolve the remaining development-only lint advisory once a compatible upstream fix is available.


## Production deployment

- Vercel deployment `dpl_HST4LafMEsaZ8kr2TwDBXCbYu5ho` completed successfully and reports `READY`, target `production`.
- Public alias: <https://portfolio2026-five-delta.vercel.app>.
- Immutable deployment: <https://portfolio2026-ddf40903p-amh092s-projects.vercel.app>.
- Dashboard: <https://vercel.com/amh092s-projects/portfolio2026/HST4LafMEsaZ8kr2TwDBXCbYu5ho>.
- Uploaded 89 deployment files (~5 MB); Vercel installed from the lockfile and independently completed the Next.js 16.3.8 production build, TypeScript, and all static pages/routes.
- Unauthenticated HTTP requests to both public locale routes return 200; `/robots.txt` allows crawling and advertises the actual-domain sitemap. Deployment-hash URLs retain Vercel's default access protection; the production alias is public.
- Published the verified local working-tree snapshot via CLI. No Git commit, push, or merge was performed, and this launch does not alter the older `portfolio` project or configure automatic Git deployments.
