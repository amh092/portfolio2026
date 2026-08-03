# Current Feature

Phase 4 — Main Sections

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Build the eight page sections plus the footer from the roadmap, with all copy verbatim from the approved `context/phase-1-plan.md`:

- Hero section (§5) — no availability pill, no profile image (permanent omissions)
- Business-growth section (§6) — intro + 5 benefit cards
- Services section (§7) — `data/services.ts` + 6 cards, 3 primary emphasized
- Projects section (§8, §9) — `data/projects.ts` + 3 cards (Tavolla → RentFlow → Insally), live-demo links only, optimized WebP card images (§16 rows 1–3)
- About section (§12) — approved biographies
- Skills section (§13) — `data/skills.ts`, 5 categories, badge-style tags
- Contact section (§14.1) — UI only; the form renders but does not submit
- Footer + back-to-top (§14.2)
- Shared UI primitives: section heading (eyebrow + fluid heading), buttons (primary gradient / ghost), technology badge, status pill, card surface, page background atmosphere
- All visible text in `messages/en.json` / `messages/ar.json` (one namespace per section); structured content in typed files under `src/data/` with types in `src/types/`
- Styling matches the prototype's static look (`ahmed-portfolio-prototype.html` + baseline screenshots in `styling-reference.md`), verified in both locales, both themes, desktop and mobile

Out of scope (deferred):

- Phase 5 — scroll reveals, staggered entrances, pulsing/neon animations, pointer-follow card glow, hero entrance motion; Motion is not installed
- Phase 6 — 3D viewer; the `three-d` section body stays a clean placeholder
- Phase 7 — contact-form submission, validation, spam protection, email provider
- Phase 8 — SEO metadata, sitemap, OG image, contrast testing, Lighthouse, deployment

## Notes

<!-- Any extra notes -->

- Branch: `feature/main-sections` — merge to `main` only after the Step 10 audit is approved
- Executed step by step via `context/phase-4-prompts.md` (11 approval gates); one step per prompt, each awaiting Ahmed's approval
- Step progress and decisions tracked in `context/phase-4-plan.md`

## History

<!-- Keep this updated. Earliest to latest -->

- Project setup and boilerplate cleanup
- 2026-08-01 — Phase 1 (Planning and Content) completed and approved in full; plan finalized in `context/phase-1-plan.md`
- 2026-08-01 — Phase 2 (Foundation) completed: next-intl routing, RTL/LTR, fonts, design tokens, one-page skeleton; merged to `main`
- 2026-08-01 — Phase 3 (Navigation) started on branch `feature/navigation`
- 2026-08-01 — Phase 3 implementation complete: lint + build pass; 22/22 browser checks pass (navbar glass, scrollspy + neon dot, theme toggle with persistence and no-flash, language switch preserving section `/en#services → /ar#services`, mobile drawer incl. RTL, Escape/scrim close, body scroll lock)
- 2026-08-02 — Phase 3 approved, merged to `main`; branch deleted. Next up: Phase 4 — Main Sections (hero, business growth, services, projects, about, skills, contact, footer) from the approved content in `phase-1-plan.md`
- 2026-08-02 — Phase 4 started on branch `feature/main-sections`; Step 1 implemented: shared UI primitives (section heading + eyebrow pill, primary/ghost buttons, technology badge, status pill, card surface, static background atmosphere) and 8 section scaffolds composed in `page.tsx`; per-section message namespaces added (7 draft eyebrow strings flagged for approval). Lint + build pass; 13/13 browser checks pass (EN/AR, dark/light, desktop/mobile; scrollspy + skip link intact). Awaiting Step 1 review
- 2026-08-02 — Step 1 approved (incl. the 7 eyebrow strings and dropping the Phase 2 per-section bottom borders) and committed. Next: Step 2 — Hero
- 2026-08-02 — Step 2 implemented: hero section from phase-1-plan §5 verbatim (copy-only — no availability pill, stats, or 3D visual), prototype hero-name gradient treatment + static heading glow, CTAs to `#projects`/`#contact` verified in both locales. Lint + build pass; hero checked EN/AR × dark/light × desktop/mobile. Awaiting Step 2 review
- 2026-08-03 — Fixed theme-reset-on-language-switch bug (reported by Ahmed, pre-existing since Phase 3): `data-theme` is no longer React-rendered, and the new `theme-sync.tsx` re-applies the saved theme before paint when the locale changes. 7/7 browser checks pass; lint + build pass
- 2026-08-03 — Step 3 implemented: business-growth section from phase-1-plan §6 verbatim (centered head with intro sub-line + 5 benefit cards in approved order; bilingual-reach card excluded per §6.3). Added shared `card-grid` utility and `.card-icon` chip (prototype parity, reusable in Step 4) plus the plain border-color/background card hover. Icon choices (Globe, Zap, Mail, Box, TrendingUp) flagged for approval. Lint + build pass; section checked EN/AR × dark/light × desktop/mobile incl. hover. Awaiting Step 3 review
- 2026-08-03 — Step 3 approved (incl. the five icon choices) and committed; Step 2's approval recorded at the same time. Next: Step 4 — Services
- 2026-08-03 — Fixed mobile horizontal-overflow bug (reported by Ahmed as "mobile Arabic looks bad"; introduced with Step 2's hero glow, affected both locales): `.hero-title::before`'s negative inset widened the scrollable area ~22px past the viewport, so mobile browsers zoomed the page out — most visible in RTL, where content was clipped at the right edge. Fix: `overflow-x: clip` on `.hero`. Verified scrollWidth = clientWidth at 390px and 1440px in EN and AR; mobile AR renders full-width and the desktop glow is unchanged. Lint + build pass
- 2026-08-03 — Step 4 implemented: services section from phase-1-plan §7 verbatim — `src/types/service.ts` (+ shared `src/types/locale.ts` with `LocalizedText`), `src/data/services.ts` with the six approved services (stable IDs, three primary `featured: true`), six cards in approved order in the shared card grid (primaries in the top row), featured cards with the prototype's accent-tinted border. Icon choices (Monitor, Layers, Rotate3d, Rocket, RefreshCw, Gauge) and the sr-only "Primary service" string flagged for approval. Lint + build pass; section checked EN/AR × dark/light × desktop/mobile incl. hover. Awaiting Step 4 review
- 2026-08-04 — Step 4 approved (incl. the six icon choices, the sr-only primary-service string, and keeping the explicit `AppLocale` typing over next-intl's `AppConfig` augmentation) and committed. Next: Step 5 — Project card images
- 2026-08-04 — Step 5 implemented: §16 manifest rows 1–3 optimized to WebP in `public/images/projects/` (sharp, quality 92): `tavolla.webp` 1600×1000 · 55.1 KB (downscaled from 2880×1800), `rentflow.webp` 1440×900 · 55.7 KB (EN hero serves both locales), `insally.webp` 1440×900 · 97.7 KB — all well under the 250 KB cap. RentFlow/Insally kept at native 1440px instead of upscaling to ~1600px (flagged for approval). Sources verified against expected content before converting and left unmodified. Lint + build pass. Awaiting Step 5 review
- 2026-08-04 — Step 5 approved (incl. keeping RentFlow/Insally at native 1440px; Tavolla card image shows only "The Golden Fork" demo branding, so the "Tavola" spelling concern is moot) and committed. Next: Step 6 — Projects section
- 2026-08-04 — Step 6 implemented: projects section from phase-1-plan §8/§9 verbatim — `src/types/project.ts` (overview's Project type + `imageAlt` for the §16 alt drafts), `src/data/projects.ts` (Tavolla → RentFlow → Insally, live-demo URLs only), and `projects-section.tsx` per the prototype's project-card layout (16:10 media via `next/image fill` + aspect box, status pill overlay, ps-block Problem/Solution + new Key-features block, technology badges, live-demo link in a new tab with per-project aria-label). New `CARD_PROJECT_CLASSES` unpadded card variant. 6 new strings (EN/AR) flagged for approval. Lint + build pass; 74/74 browser checks (EN/AR × dark/light × 1440/390; images load, no overflow, links correct). Awaiting Step 6 review
- 2026-08-04 — Step 6 approved via "next" (incl. the six new Projects strings, the `imageAlt` type extension, and the Key-features block layout) and committed. Next: Step 7A — About
- 2026-08-04 — Step 7A implemented: about section with the §12 biographies verbatim (one `About.bio` message per locale). Prototype's portrait placeholder and bullet list omitted (photo is a resolved omission; bullet content never approved) — section head + single bio paragraph, head tightened to the prototype's 1.5rem gap via new `tight` prop on SectionHeading. No new strings. Lint + build pass; 10/10 browser checks (EN/AR × dark/light × 1440/390; bio verbatim, no images/lists, no overflow). Awaiting Step 7A review
- 2026-08-04 — Step 7A approved (incl. omitting the prototype's portrait placeholder and bullet list, and the SectionHeading `tight` prop) and committed. Next: Step 7B — Skills
