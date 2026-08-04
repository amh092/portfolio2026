# Current Feature

Phase 5 — Animation and Neon Styling

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

Animate the completed Phase 4 sections per the prototype (`ahmed-portfolio-prototype.html` — behavior source of truth; GSAP code is reference only, implementation uses Motion + CSS per the stack table), bounded by the `phase-1-plan.md` §15.5 restraint rules. No new copy.

Roadmap Phase 5 items:

- Hero entrance animation
- Scroll reveals (section heads + standalone blocks)
- Staggered card entrances (service cards and the other card grids)
- Project-card hover states
- Active navigation glow (shipped in Phase 3 — verify vs the prototype and under reduced motion)
- Subtle button pulsing (primary CTAs, `neon-pulse`)
- Reduced-motion support (global foundation + every step verified)
- Mobile animation performance testing

Phase 4 deferred-to-5 items (recorded at the Phase 4 Step 10 audit):

- Scroll reveals + staggered entrances
- Card/method-row hover lifts, neon shadows, and pointer-follow card glow
- Hero entrance motion
- Primary-button `neon-pulse`
- Background orb drift
- The prototype's floating scroll-appearing to-top button (optional — Step 9 decision gate, Ahmed's call; the footer link shipped in Phase 4 either way)
- Motion install

Out of scope (deferred):

- Phase 6 — everything 3D: viewer, model loading states, the `three-d` section body (its section head still gets the standard reveal; the body stays a placeholder)
- Phase 7 — contact-form submission states (loading pulse during submission arrives with a real submission)
- Phase 8 — SEO metadata, contrast testing, Lighthouse, sitemap/OG/favicon assets, deployment
- Not planned at all: overview-listed effects absent from the prototype (hero particles, moving gradients, connecting lines, hover tilt, card expansion, featured-card pulsing) — revisit only if Ahmed asks

## Notes

<!-- Any extra notes -->

- Branch: `feature/animations` — merge to `main` only after the Step 10 audit is approved (Phase 4 merged to `main` 2026-08-04)
- Executed step by step via `context/phase-5-prompts.md` (10 approval gates, Step 9 optional); one step per prompt, each awaiting Ahmed's approval
- Step progress and decisions tracked in `context/phase-5-plan.md`
- Every step: reduced-motion check, both locales, both themes, 1440/390, lint + build

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
- 2026-08-04 — Step 7B implemented: skills section from phase-1-plan §13 — `src/types/skill.ts`, `src/data/skills.ts` (5 categories in approved order, EN labels + skill lists verbatim; AR labels from the §13 note, flagged for approval), and `skills-section.tsx` per the prototype (centered head, `.g-2` wide card grid 3+2, icon + h3 per category, badge-style tag list; hover = color transition only, lift/shadow deferred to Phase 5). No proficiency bars. New `Skills.sub` string drafted (EN/AR) and flagged. Category icons (Code, Server, Cuboid, Languages, Wrench) flagged. Lint + build pass; browser checks EN/AR × dark/light × 1440/390 + hover, zero horizontal overflow, scrollspy intact. Awaiting Step 7B review
- 2026-08-04 — Step 7B approved (incl. the AR category labels from the §13 note, the `Skills.sub` string, and the five category icons) and committed. Next: Step 8 — Contact section (UI only)
- 2026-08-04 — Step 8 implemented: contact section from phase-1-plan §14.1 verbatim — heading "Let's work together" / «لنعمل معاً», supporting copy, labeled Name/Email/Subject/Message form + "Send Message"; the §14.1 sending/success/error strings added to messages for Phase 7 but only the idle state renders. Form fully inert: no action, no handler, no validation; the button is `type="button"` so even implicit submission does nothing (verified: click + Enter change nothing). `src/types/social-link.ts` + `src/data/social-links.ts` (Email, GitHub, LinkedIn, WhatsApp) rendered as prototype method rows; GitHub/LinkedIn/WhatsApp glyphs inlined in `ui/brand-icons.tsx` since lucide-react 1.x dropped brand icons; details kept LTR in RTL via `bdi`. No new strings. Lint + build pass; 35/35 browser checks (EN/AR × dark/light × 1440/390: labels associated, focus order, link hrefs, no overflow). Awaiting Step 8 review
- 2026-08-04 — Step 8 approved (incl. the `type="button"` inert-form mechanism, no placeholders/required markers, same-tab contact links, and the inlined brand icons) and committed. Next: Step 9 — Footer and back-to-top
- 2026-08-04 — Step 9 implemented: footer from phase-1-plan §14.2 verbatim — brand line, © {year} copyright (year interpolated, currently 2026), GitHub · LinkedIn · Email icon links reusing `src/data/social-links.ts`, the existing language switcher, and a visible "Back to top" / «العودة إلى الأعلى» link → `#home` (the prototype's floating scroll-appearing button was not requested and its show/hide behavior is Phase 5 territory). Rendered from the [locale] layout below `{children}`; no anchor, visually quiet (border-t, bg-2/50, small text). Footer switcher passes `activeSection="contact"` — verified switch from footer lands on `/ar#contact` with scroll preserved. Icon map extracted to `SOCIAL_LINK_ICONS` in `ui/brand-icons.tsx` (contact section refactored to reuse it, no visual change). No new strings. Lint + build pass; 21/21 browser checks (structure, link hrefs/labels, back-to-top scroll, EN/AR × dark/light × 1440/390 no overflow). Awaiting Step 9 review
- 2026-08-04 — Step 9 approved (incl. the in-footer back-to-top link instead of the prototype's floating button, the footer switcher's `activeSection="contact"`, and Western year digits in both locales) and committed. Next: Step 10 — final Phase 4 audit
- 2026-08-04 — Step 10 (final audit) implemented: full page verified against all five baseline screenshots (desktop dark/light EN, desktop dark AR, mobile dark EN — only approved content-driven differences); all copy re-checked verbatim against phase-1-plan (EN + AR, incl. data files and alt text); en/ar key sets identical (70/70, only unused keys = the 3 approved Phase 7 form states); one h1 + correct landmarks/aria; 45+ browser checks pass (scrollspy all 8 sections, anchor nav, back-to-top, section- and theme-preserving language switch, keyboard order incl. skip link and form, inert form, mobile drawer, zero horizontal overflow EN/AR × 1440/390). Two defects fixed: the three-d scaffold's hard-coded "— Phase 4" placeholder text removed (body now a clean head-only placeholder for Phase 6) and the unused `catch (e)` binding in `theme-init.js` dropped (lint now warning-free). Lint + build pass. Phase marked Completed; not merged — awaiting Ahmed's final review
- 2026-08-04 — Phase 4 audit approved (via the Phase 5 Step 1 prompt); lint + build re-verified on `feature/main-sections`, fast-forward merged to `main`, branch deleted (local + origin, matching the Phase 3 pattern). Phase 5 (Animation and Neon Styling) started on branch `feature/animations`
- 2026-08-04 — Phase 5 Step 1 implemented: this file rewritten for Phase 5; **`motion@12.43.0`** installed (the stack table's "Motion for React" — current package name of the former `framer-motion`, confirmed via motion.dev docs; imports from `motion/react`; not yet used anywhere, name/version awaiting approval). The overview §Animation System reduced-motion foundation was found **already present verbatim** in `globals.css` from Phase 2 — no CSS change needed, so zero visual change with emulation off holds by construction. Verified under DevTools emulation: nav dot-pulse neutralized (0.01ms × 1 → static), anchor scrolling instant (1 frame vs 78 smooth), all sections visible, EN/AR × 1440/390 + light-theme spot check (19/19 checks); no JS-driven scrolling in source, so the CSS override fully governs anchors. Noted: 3 pre-existing high `npm audit` advisories (Next-bundled postcss, sharp) — unrelated to motion, deferred to Phase 8. Lint + build pass. Awaiting Step 1 review
- 2026-08-04 — Step 1 approved (incl. `motion@12.43.0` as the animation package and keeping the Phase 2 reduced-motion block as the global foundation) and committed. Next: Step 2 — Hero entrance animation
