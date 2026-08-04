# Phase 5 Plan — Animation and Neon Styling

Living artifact for Phase 5. Executed step by step through the prompts in `context/phase-5-prompts.md`. There is no new copy in this phase — it animates the Phase 4 sections; the styling and behavior source of truth is `ahmed-portfolio-prototype.html`, bounded by the `phase-1-plan.md` §15.5 restraint rules.

## 1. Phase status

**In progress — Step 1 approved 2026-08-04; next up Step 2 (hero entrance).** Phase 4 was approved via the Step 1 prompt and fast-forward merged to `main` 2026-08-04 (lint + build re-verified first); `feature/main-sections` deleted locally and on origin. Phase 5 work happens on branch `feature/animations`.

## 2. Step breakdown and progress

Run one step at a time via `phase-5-prompts.md`; a step is Done only after Ahmed approves it.

| Step | Builds | Source | Status |
|---|---|---|---|
| 1 | Merge Phase 4 → `main`; branch `feature/animations`; install Motion; global reduced-motion foundation | overview §Animation System (Reduced Motion), stack table | Done — approved 2026-08-04 |
| 2 | Hero entrance animation (staggered fade/slide, once per session) | overview §2 Hero Animation; prototype hero timeline | Implemented 2026-08-04 — awaiting approval |
| 3 | Scroll-reveal mechanism + section heads and standalone blocks | prototype `.reveal` + section-reveal triggers | Pending |
| 4 | Staggered card-grid reveals (growth, services, projects, skills) | prototype grid stagger; overview per-section lists | Pending |
| 5 | Hover states deferred from Phase 4: card lifts, neon shadows, icon glow, tag lift, method-row slide | prototype `.card:hover` family | Pending |
| 6 | Pointer-follow card glow (`--mx`/`--my` radial) | prototype pointermove handler + `.card::after` | Pending |
| 7 | Neon pulsing on primary buttons; verify active-nav-dot pulse | overview §Neon Pulsing Effects; prototype `.neon-pulse` | Pending |
| 8 | Background orb drift (gentle scroll parallax) | prototype orb scrub tweens | Pending |
| 9 | **Optional (open decision):** floating scroll-appearing to-top button | prototype `.to-top`; Phase 4 Step 9 deferral | Decision gate |
| 10 | Mobile animation performance test + final Phase 5 audit; phase close | roadmap; whole plan | Pending |

## 3. Scope boundaries

**In scope:** hero entrance motion; scroll reveals with per-group stagger; the card/tag/method-row hover lifts and neon shadows deferred from Phase 4; pointer-follow card glow; primary-button neon pulse; background orb drift; reduced-motion support end to end; mobile animation performance testing; the optional floating to-top button (Step 9, Ahmed's call); installing Motion.

**Out of scope (deferred):**

- **Phase 6** — everything 3D: viewer, model loading states, the `three-d` section body (its section head still gets the standard Step 3 reveal; the body stays a placeholder).
- **Phase 7** — form submission states (loading pulse during submission is Phase 7, when a submission exists).
- **Phase 8** — Lighthouse scoring, contrast checks, SEO, deployment.
- **Not planned at all:** hero background particles, moving hero gradient, animated connecting lines between skills, hover tilt on project cards, smooth card expansion — listed in the overview as "possible" but absent from the prototype, which is the behavior source of truth. Revisit only if Ahmed asks.

## 4. Standing decisions (restated where they bite)

- **Motion, not GSAP.** The stack table fixes "Motion for React and CSS". The prototype's GSAP + ScrollTrigger code is *behavioral reference only* — durations, eases, staggers, and trigger points are read from it, but the implementation uses the `motion` package and plain CSS. GSAP is never installed.
- **§15.5 restraint rules bind every step:** glow only on primary CTA, active nav indicator, viewer edges, hero heading backdrop, decorative orbs; pulse cycles ≥ 3s, ease-in-out, tiny amplitude; glow alpha capped by `--glow-a`; no glow behind body text; no flashing; full reduced-motion support.
  - *Interpretation to confirm at Step 5:* the prototype's card **hover** neon shadows and pointer-follow glow are transient interaction feedback, not resting glow, so they don't violate the "glow only on" list. Flagged for Ahmed's confirmation.
- **Sections stay server components.** Animation is added via small `'use client'` wrapper components that receive server-rendered children — no section is converted wholesale to a client component.
- **Content is never hostage to JS.** SSR HTML must not permanently hide content: reveals are progressive enhancement with a safety net (mirroring the prototype's `no-gsap` fallback and 4s sweep), and landing mid-page (hash link, section-preserving language switch) shows everything immediately.
- **No new visible copy.** Any string a step genuinely needs (e.g. an aria-label) is drafted minimally in both languages and flagged as "New strings for approval". Step 9 reuses the existing `Footer` back-to-top string.
- **Already shipped, don't rebuild:** the active-nav neon dot + `dot-pulse` (Phase 3) — Step 7 only verifies it against the prototype and confirms reduced-motion kills it. The static heading glow, button hover glow, and plain color/border hover transitions from Phase 4 stay as-is; Phase 5 layers on top.
- **Footer stays quiet** — the prototype gives it no reveal and no animation; Phase 5 adds none.

## 5. Quality gates (every step)

- `npm run lint` and `npm run build` pass.
- Browser check in both locales (RTL + LTR), both themes, desktop (1440) and mobile (390) widths — motion compared side by side against the prototype opened in a browser (`ahmed-portfolio-prototype.html`, `?lang=ar` for Arabic).
- **Reduced-motion check every step:** with `prefers-reduced-motion: reduce` emulated, the step's animation is absent and all content fully visible.
- No layout shift introduced (reveals animate transform/opacity only), no horizontal overflow, scrollspy + anchor navigation + section-preserving language switch still correct.
- History line appended to `context/current-feature.md`; step Status + Decision log updated here; list item added to `context/progress-log.md`.
- Stop and wait for Ahmed's approval before the next step.

## 6. Decision log

| Date | Decision | Status |
|------|----------|--------|
| 2026-08-04 | Phase 5 broken into 10 approval gates (Step 9 optional); prompts authored in `context/phase-5-prompts.md`; single branch `feature/animations`; Motion chosen over the prototype's GSAP per the stack table, prototype timeline kept as behavioral reference | Proposed — awaiting Ahmed |
| 2026-08-04 | Open question (Step 2): hero entrance would replay on every locale switch because the locale layout remounts — the prototype animates only on first load. Proposal: run the entrance once per browser session (sessionStorage flag), skip on subsequent mounts | Implemented at Step 2 (see the Step 2 entries below) — awaiting approval |
| 2026-08-04 | Open question (Step 5): gate hover lifts behind `@media (hover: hover)` so touch devices don't get sticky-hover states — the prototype doesn't gate, but it also wasn't built for touch | Open — decide at Step 5 |
| 2026-08-04 | Open question (Step 6): whether pointer-follow glow should also be disabled under reduced motion (it tracks the pointer but nothing moves on its own). Proposal: disable it there too — cheapest safe default | Open — decide at Step 6 |
| 2026-08-04 | Open question (Step 9): the prototype's floating scroll-appearing to-top button was deliberately not built in Phase 4 (Step 9 decision: footer link shipped instead, floating button "Phase 5 territory; revisit there if wanted"). Step 9 is the revisit — Ahmed runs it to add the button or skips it to keep footer-only | Open — Ahmed's call |
| 2026-08-04 | Overview-listed effects absent from the prototype (particles, moving gradients, connecting lines, hover tilt, card expansion, featured-card pulsing) are excluded from Phase 5 scope — prototype is the behavior source of truth | Proposed |
| 2026-08-04 | Step 1 Motion install: package **`motion@12.43.0`** (`npm install motion`, imports from `motion/react`) — the current name of the library formerly published as `framer-motion`, confirmed against motion.dev via ctx7. Installed as a regular dependency; not yet used anywhere — Steps 2+ may now use it | Approved 2026-08-04 |
| 2026-08-04 | Step 1 reduced-motion foundation: the overview §Animation System block **already existed verbatim** in `globals.css` (`@layer base`, lines 172–181, shipped with the Phase 2 token setup) — `prefers-reduced-motion: reduce` forces `animation-duration`/`transition-duration` to 0.01ms, `animation-iteration-count` to 1, and `scroll-behavior` to auto on `*`/`::before`/`::after`. No CSS change was made (so "zero visual change with emulation off" holds by construction). Verified in the browser under emulation: nav dot-pulse neutralized (computed 1e-05s × 1 → static), anchor scroll instant (1 frame vs 78 frames smooth), no section hidden — EN/AR × 1440/390 + a light-theme spot check, 18/18 + 1 checks pass. Source scan confirms no JS-driven scrolling anywhere, so the CSS override fully governs anchor navigation | Verified 2026-08-04 |
| 2026-08-04 | Step 1 note (no action): `npm audit` reports 3 pre-existing high advisories in Next.js's bundled `postcss` and in `sharp` — present before the `motion` install, which itself added no advisories. Not touched per the overview's dependency-security rules (no blind `audit fix`, no Next downgrade); flag for review in Phase 8's dependency audit | Recorded |
| 2026-08-04 | **Step 2 mechanism (for approval): CSS keyframes gated by a pre-paint session script — not Motion.** SSR markup never hides the hero; `public/entrance-init.js` (same `<script async src>` resource pattern as `theme-init.js`, loaded in the locale layout head) adds `hero-entrance` to `<html>` before first paint only when the entrance should play: first load this browser session (`sessionStorage.heroEntrancePlayed` guard, set-then-check so a blocked storage → static hero), and not `prefers-reduced-motion`. `globals.css` scopes the animation under `html.hero-entrance .hero-enter` (0.9s, 90ms stagger via `--hero-enter-i` index, `translateY(26px)` + fade, `both` fill). The script removes the class at 1.7s — simultaneously the safety net (nothing can stay hidden past 1.7s even if the animation never runs; prototype's sweep is 4s) and the replay guard for the locale-switch remount. Rationale for CSS over Motion: a Motion version must wait for hydration (hero sits hidden or flashes on slow devices) and would still need this exact pre-paint CSS gate to satisfy "SSR must not hide the hero" — the gate alone already implements the timeline, so Motion would add only a hydration dependency. Motion remains installed and unused; its debut is the Step 3 scroll reveals. Known edge (accepted): switching language within 1.7s of the very first paint replays the entrance on the remounted hero — humanly hard to do, self-heals | Implemented — awaiting approval |
| 2026-08-04 | Step 2 ease: GSAP `power3.out` (the prototype timeline's ease, = easeOutQuart) mapped to `cubic-bezier(0.165, 0.84, 0.44, 1)` as new token `--ease-out-quart` in `:root` next to `--ease` — Steps 3–4 reuse it (their prototype tweens also use power3.out). The four animated blocks are exactly the prompt's four (eyebrow pill, h1 incl. its static glow ::before, lead, CTA row): delays 0/.09/.18/.27s. `Eyebrow` gained an optional `className` prop to carry the block class; `@media (prefers-reduced-motion: reduce)` additionally sets `animation: none` on the blocks because the Step 1 foundation zeroes durations but not delays (a reduced-motion user must never wait out a backwards-fill delay) — belt-and-suspenders, the gate script already never adds the class under reduced motion | Implemented — awaiting approval |
| 2026-08-04 | **Step 2 review fix (Ahmed: "the animation is not convincing and can be missed"):** root cause — the prototype's timeline only starts after its GSAP CDN fetch + DOMContentLoaded, so its hero holds a hidden beat before sweeping in, while the CSS version started at first paint and raced the visitor's attention (mostly done before the eye lands). Fix: explicit **250ms lead-in** on the timeline (delays now .25/.34/.43/.52s; distance/duration/stagger/ease stay prototype-exact) and gate-class removal moved 1.7s → **2s** (timeline now ends ~1.42s; worst-case-hidden stays ≤ 2s, still under the prototype's 4s sweep). Re-verified 20/20 on the prod build incl. class-before-first-paint (165ms vs 260ms), no replay on reload/switch, reduced-motion/no-JS instant | Implemented — awaiting approval |
| 2026-08-04 | Step 2 verification (prod build, fresh isolated session per scenario, 20/20): gate class added at 207ms vs first paint 344ms (no flash); computed per-block animation `hero-enter 0.9s cubic-bezier(0.165,0.84,0.44,1)` delays 0/.09/.18/.27s; stagger visibly ordered mid-flight; all blocks opacity 1 after the timeline; class removed + flag set; reload and EN→AR switch render static (no replay, RTL correct); reduced-motion EN/AR instant; JS-disabled fully visible/unanimated; entrance plays AR 1440, EN/AR 390, EN light; no horizontal overflow anywhere; zero layout shift from the entrance (the only CLS entry, 2.3e-6 from a navbar svg at hydration, occurs identically with the entrance disabled — pre-existing, negligible, noted for Phase 8) | Verified 2026-08-04 |
