# Phase 4 Plan — Main Sections

Living artifact for Phase 4. Executed step by step through the prompts in `context/phase-4-prompts.md`; all copy comes verbatim from the approved `context/phase-1-plan.md`.

## 1. Phase status

**In progress.** Branch `feature/main-sections` created 2026-08-02; Steps 1–6 and 7A approved and committed. Next: Step 7B — Skills. Merge to `main` only after the Step 10 audit is approved.

## 2. Step breakdown and progress

Run one step at a time via `phase-4-prompts.md`; a step is Done only after Ahmed approves it.

| Step | Builds | Content source (`phase-1-plan.md`) | Status |
|---|---|---|---|
| 1 | Phase setup, shared UI primitives (section heading, buttons, badges, status pill, card surface, background atmosphere), section scaffolds + page shell | §15 | Done — approved 2026-08-02 |
| 2 | Hero section | §5 | Done — approval recorded 2026-08-03 with Step 3's (Step 3 was run on Ahmed's instruction) |
| 3 | Business-growth section (intro + 5 cards) | §6 | Done — approved 2026-08-03 |
| 4 | Services section (`data/services.ts` + 6 cards) | §7 | Done — approved 2026-08-04 |
| 5 | Project card images — 3 screenshots → WebP ≤ 250 KB (pre-authorized) | §16 rows 1–3 | Done — approved 2026-08-04 |
| 6 | Projects section (`data/projects.ts` + 3 cards, Tavolla → RentFlow → Insally) | §8, §9 | Done — approved 2026-08-04 |
| 7A | About section | §12 | Done — approved 2026-08-04 |
| 7B | Skills section (`data/skills.ts`, 5 categories) | §13 | Not started |
| 8 | Contact section — UI only, form does not submit | §14.1 | Not started |
| 9 | Footer + back-to-top | §14.2 | Not started |
| 10 | Full-page audit vs baseline screenshots; phase close | whole plan | Not started |

## 3. Scope boundaries

**In scope:** the eight page sections' static structure, styling, and approved bilingual content; typed data files (`projects`, `services`, `skills`, `social-links`); message namespaces per section; project card image optimization; footer; plain CSS hover/focus transitions.

**Out of scope (deferred):**

- **Phase 5** — scroll reveals, staggered entrances, pulsing/neon animations, pointer-follow card glow, hero entrance motion; Motion is not installed in Phase 4.
- **Phase 6** — the 3D viewer; the `three-d` section body stays a clean placeholder.
- **Phase 7** — contact-form submission, validation, spam protection, email provider; the form renders idle-state only.
- **Phase 8** — SEO metadata, sitemap, OG image, contrast testing (§15.3 cautions), Lighthouse, deployment.

## 4. Standing decisions (from Phase 1 — restated where they bite)

- Copy is **verbatim** from `phase-1-plan.md`; strings the plan doesn't provide are drafted minimally and flagged as "New strings for approval" in the step summary.
- Hero has **no availability pill and no profile image** (permanent omissions, §17) — the prototype's availability dot is not copied.
- Project cards link **live demos only** — no repository URLs.
- RentFlow's **English hero image serves both locales**.
- All three projects show the green **Completed** status pill; amber stays unused this phase.
- Bilingual support is mentioned at most once per section — no extra mentions beyond the approved copy.
- The Tavolla screenshot's in-app "Tavola" spelling was accepted in Phase 1; one last look at Step 5.
- Skills Arabic category labels (§13 note) were noted, not formally approved — flagged for approval at Step 7B.

## 5. Quality gates (every step)

- `npm run lint` and `npm run build` pass.
- Browser check in both locales (RTL + LTR), both themes, desktop and mobile widths, against the baseline screenshots in `styling-reference.md`.
- No hard-coded visible text in components; `en.json`/`ar.json` key sets stay identical.
- History line appended to `context/current-feature.md`.
- Stop and wait for Ahmed's approval before the next step.

## 6. Decision log

| Date | Decision | Status |
|------|----------|--------|
| 2026-08-04 | Step 7A layout: prototype's about-portrait placeholder (decorative "A" initial) and about-points bullet list omitted — the portrait stands in for the omitted profile photo and the bullets' content (overview's "suggested positioning") is not part of the approved §12 bio. Rendered as section head + single bio paragraph (max-w 65ch, muted); head gap tightened to the prototype about head's 1.5rem via a new optional `tight` prop on SectionHeading. Bio lives in `messages/*.json` (`About.bio`) since it is prose, not structured data | Approved 2026-08-04 |
| 2026-08-04 | Step 6 data shape: `src/types/project.ts` = the overview's Project type plus `imageAlt: LocalizedText` (the §16 manifest alt drafts must ship with the card); `repositoryUrl?` kept in the type for fidelity but never set — cards link live demos only. All three projects `featured: true`, `status: "completed"` | Approved 2026-08-04 ("next") |
| 2026-08-04 | Step 6 card layout: prototype `.card.project` via new unpadded `CARD_PROJECT_CLASSES` in `ui/card.ts` (padding moved from the shared base into each variant — existing cards unchanged); media = 16:10 aspect box (`next/image fill` + `sizes`, no layout shift — all three images are exactly 16:10) with the status pill overlaid inline-start; Key features rendered as a third ps-block `dl` (dt label + one dd per feature) since the prototype card has no features block; left-aligned section head per prototype (no `center`) | Approved 2026-08-04 ("next") |
| 2026-08-04 | Step 6 new strings (EN/AR) in `Projects`: `problemLabel` "Problem"/«المشكلة», `solutionLabel` "Solution"/«الحل», `featuresLabel` "Key features"/«أبرز الميزات», `liveDemo` "Live demo"/«عرض مباشر», `liveDemoAria` "Live demo — {project} (opens in a new tab)"/«عرض مباشر — {project} (يفتح في تبويب جديد)», `statusCompleted` "Completed"/«مكتمل». All except `featuresLabel`/`liveDemoAria` align with the prototype's own labels | Approved 2026-08-04 ("next") |
| 2026-08-04 | Step 5 asset prep (§16 rows 1–3) via sharp (quality 92, effort 6, smart subsampling): `tavolla.webp` 1600×1000 · 55.1 KB (downscaled from 2880×1800); `rentflow.webp` and `insally.webp` kept at **native 1440×900** (55.7 KB / 97.7 KB) instead of upscaling to the ~1600px target — upscaling adds blur, not detail. Sources unmodified. Note: the Tavolla shot shows only the demo restaurant's "The Golden Fork" branding — no "Tavola/Tavolla" spelling is visible on the card image at all | Approved 2026-08-04 (incl. native 1440px for RentFlow/Insally) |
| 2026-08-04 | Locale typing stays as implemented: explicit `AppLocale`/`LocalizedText` in `src/types/locale.ts`; next-intl's `AppConfig` module augmentation was considered during Step 4 review and declined by Ahmed ("keep as it is") — do not re-propose in Steps 6–7B | Decided |
| 2026-08-03 | Step 4 service-card icons (lucide): Monitor (Business Websites), Layers (Web Applications), Rotate3d (Interactive 3D Experiences), Rocket (Landing Pages), RefreshCw (Website Redesign), Gauge (Performance Optimization). Five mirror the prototype's icon hints; Rotate3d replaces the prototype's cube to avoid repeating Step 3's approved Box icon | Approved 2026-08-04 |
| 2026-08-03 | Step 4 data shape: shared `src/types/locale.ts` (`AppLocale` derived from routing, `LocalizedText`) + `src/types/service.ts` per the overview's content model, with `icon` narrowed to a `ServiceIcon` union for strictness; §7.1's AR lines split at the em-dash into title/description. Services grid reuses the shared card grid (g-3 pattern) so the six cards fall 3+3 with the primary row on top — the prototype's g-4 was sized for its 8 placeholder cards | Approved 2026-08-04 |
| 2026-08-03 | Step 4 featured treatment: prototype `.card.featured` accent-tinted resting border via new `CARD_FEATURED_SURFACE_CLASSES` in `ui/card.ts`; plus an sr-only "Primary service" / «خدمة أساسية» label on featured cards (new string `Services.primaryService`) so importance isn't conveyed by border color alone (overview a11y rule) | Approved 2026-08-04 |
| 2026-08-03 | Step 3 benefit-card icons (lucide): Globe (Stronger Online Presence), Zap (Better User Experience), Mail (More Customer Enquiries), Box (Interactive Brand Experiences), TrendingUp (Built to Grow With You) — aligned with the prototype's growth-card icon set | Approved 2026-08-03 |
| 2026-08-03 | Shared `card-grid` utility (prototype `.grid.g-3` auto-fit columns) and `.card-icon` chip added to globals.css for reuse by Services (Step 4); `.card-surface` gained the plain border-color/background hover allowed by the Step 3 prompt | Implemented |
| 2026-08-02 | Phase 4 broken into 11 approval gates (Steps 1–10, with 7A/7B); prompts authored in `context/phase-4-prompts.md`; single branch `feature/main-sections`; image optimization isolated as its own gate (Step 5) for visual approval before cards are built. | Approved |
| 2026-08-02 | Step 1 implemented: shared primitives (`section-heading`, `button`, `technology-badge`, `status-pill`, `card-surface`, background atmosphere) in prototype-parity CSS (`@layer components` in `globals.css`, no Phase 5 animations); 8 section scaffolds composed in `page.tsx` with anchor IDs/aria wiring unchanged; per-section message namespaces added. Section bottom borders from the Phase 2 skeleton dropped to match the prototype. 7 eyebrow strings drafted (EN/AR) — new strings pending approval. Lint + build pass; 13/13 browser checks (both locales, both themes, 1440/390). | Approved 2026-08-02 |
| 2026-08-02 | Step 1 approved as-is: the 7 eyebrow strings (EN/AR) and the removal of the Phase 2 per-section bottom borders are confirmed. | Approved |
| 2026-08-02 | Step 2 implemented: hero from §5 verbatim (eyebrow pill, h1, lead, gradient + ghost CTAs), copy-only — the prototype's availability pill, stats row, and 3D visual are omitted (unapproved/§17). Prototype `.hero-name` treatment on the h1 (step-4, fg→accent→indigo gradient text, mirrored in RTL), static soft heading glow per §15.5, full-height centered layout. AR heading measure widened to 24ch (Cairo runs narrower than Inter); `text-wrap: balance` to avoid orphans; unused `as` prop removed from SectionHeading. Lint + build pass; 5 hero screenshots (EN/AR × dark/light × 1440/390) + 4/4 CTA anchor checks in both locales. | Awaiting review |
| 2026-08-03 | Bug reported by Ahmed during Step 2 review: theme reset to dark on language switch (pre-existing since Phase 3). Root cause: a locale switch re-mounts the root layout and React 19 re-acquires the `<html>` singleton, wiping `data-theme` — whether set from JSX or by script. Fix: `data-theme` removed from JSX (never React-managed), init script now always sets it, and a new `ThemeSync` client component re-applies the saved theme before paint on every locale change. 7/7 browser checks: theme toggling, both directions of language switch in both themes, reload persistence, section-preserving switch intact. | Fixed — verify in Step 2 review |
