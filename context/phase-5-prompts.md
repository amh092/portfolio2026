# Phase 5 — Reviewable Prompts

These prompts split Phase 5 (Animation and Neon Styling) into small approval gates. Run them **one at a time, in order**. Do not run the next prompt until the current result has been reviewed and approved.

This phase adds no copy — it animates the Phase 4 sections. The prototype (`ahmed-portfolio-prototype.html`) is the behavior source of truth; its GSAP code is reference only — the implementation uses Motion + CSS (stack table).

| Step | Builds | Behavior source |
|---|---|---|
| 1 | Merge Phase 4; branch + Motion install + reduced-motion foundation | overview §Animation System |
| 2 | Hero entrance animation | prototype hero timeline (y:26, .9s, stagger .09) |
| 3 | Scroll reveals — section heads + standalone blocks | prototype section reveals (y:30, .8s, stagger .1, ~78%) |
| 4 | Staggered card-grid reveals | prototype grid reveals (y:34, .75s, stagger .07, ~72%) |
| 5 | Card/tag/method-row hover lifts + neon shadows | prototype `.card:hover`, `.skill-tag:hover`, method rows |
| 6 | Pointer-follow card glow | prototype `.card::after` + pointermove handler |
| 7 | Neon pulsing on primary buttons; verify nav-dot pulse | prototype `.neon-pulse` (3.4s); §15.5 restraint |
| 8 | Background orb drift | prototype orb scrub (yPercent 18 / −14) |
| 9 | Floating to-top button — **optional, Ahmed's call** | prototype `.to-top` |
| 10 | Mobile animation performance test + final audit | roadmap; whole plan |

## Shared rules for every prompt

- Read `context/project-overview.md` (the 🎬 Animation System section and each section's animation list), `context/phase-1-plan.md` §15.5, `context/phase-4-plan.md` (deferred items), `context/phase-5-plan.md`, `context/styling-reference.md`, `context/coding-standards.md`, and `context/current-feature.md` before doing any work.
- Per `context/AGENTS.md`: this Next.js version has breaking changes — read the relevant guide in `node_modules/next/dist/docs/` before writing code. Likewise, verify Motion's current React API against its current docs (ctx7 / motion.dev) before writing animation code — do not rely on remembered `framer-motion` APIs.
- All work happens on branch `feature/animations`. Commit each approved step with the overview's commit style (`feat:` / `style:` / `fix:`).
- **Prototype parity, Motion implementation.** Match the prototype's timings, eases, distances, staggers, and trigger points (open it in a browser next to the app, `?lang=ar` for Arabic). Never install GSAP. No dependencies beyond Motion (installed in Step 1) without approval.
- **§15.5 restraint rules apply to every step:** glow only on primary CTA, active nav indicator, viewer edges, hero heading backdrop, decorative orbs; pulse cycles ≥ 3s, ease-in-out, tiny amplitude; glow alpha capped by `--glow-a`; no glow behind body text; no flashing.
- **Sections stay server components** — add animation through small `'use client'` wrappers that receive server-rendered children as props. `'use client'` only where interactivity requires it.
- **Content is never hostage to JS or the viewport:** SSR HTML must not permanently hide content; every reveal has a safety net (nothing stays invisible if a trigger never fires); landing mid-page via hash or the section-preserving language switch shows all sections above/at the landing point immediately; reveals animate once and never re-hide.
- **Reduced motion every step:** all new animation must be absent under `prefers-reduced-motion: reduce` (foundation lands in Step 1); verify with DevTools emulation as part of every step's browser check.
- Animate `transform`/`opacity` only — no layout-affecting properties, no layout shift, no horizontal overflow. Reuse the existing `--ease` and design tokens.
- No new visible copy. If a step needs a string (e.g. an aria-label), draft the smallest possible text in both languages and flag it under "New strings for approval". All text stays in `messages/en.json` / `messages/ar.json`.
- Before stopping: `npm run lint` and `npm run build` pass; browser-check the step in both locales (RTL + LTR), both themes, 1440 and 390 widths, plus the reduced-motion pass. Append a History line to `context/current-feature.md`, update the step Status and Decision log in `context/phase-5-plan.md`, and add a list item to `context/progress-log.md`.
- At the end, summarize only: what changed, decisions or new strings needing approval, and what I should review.
- Stop after the requested step and wait for approval.

---

## Step 1 — Merge Phase 4, phase setup, Motion install, reduced-motion foundation

```text
Follow the shared rules in context/phase-5-prompts.md.

Me running this prompt is my approval of the Phase 4 audit. First: on feature/main-sections run npm run lint and npm run build, merge the branch into main, and delete it.

Then create branch feature/animations and set up the phase:

1. Rewrite context/current-feature.md for Phase 5: status In Progress, goals (the roadmap's Phase 5 items plus the Phase 4 deferred list already recorded in the file), out-of-scope (Phase 6 3D, Phase 7 form states, Phase 8 quality/deploy), branch note; keep the existing History.
2. Install the Motion package (the stack table's "Motion for React"). Report the exact package name and version for approval before using it in later steps.
3. Add the overview §Animation System reduced-motion foundation to globals.css: under prefers-reduced-motion: reduce, force animation/transition durations to near-zero and scroll-behavior to auto, globally. Verify the existing nav dot-pulse stops and anchor scrolling becomes instant under emulation.

No visual changes in this step beyond the reduced-motion behavior. Stop for review.
```

Review: Phase 4 merged cleanly; the Motion package name/version; the reduced-motion CSS (nav dot static, jump scrolling) with emulation on; zero visual change with it off.

## Step 2 — Hero entrance animation

```text
Follow the shared rules in context/phase-5-prompts.md.

Implement the hero entrance per the prototype timeline: the hero's four blocks (eyebrow pill, h1, lead paragraph, CTA row) slide up ~26px and fade in over ~0.9s with a ~0.09s stagger, power3.out-equivalent ease, starting on load. There is no hero visual (permanent omission) — animate only the four text blocks.

Constraints:
- The locale layout remounts on language switch, which would replay the entrance; the prototype animates only on first load. Run the entrance once per browser session (e.g. a sessionStorage flag) and skip it on later mounts — flag this mechanism for approval.
- SSR markup must not hide the hero: no-JS and reduced-motion users see the hero instantly; include the safety net.
- The Phase 4 static heading glow stays untouched.

Stop for review.
```

Review: first-load impression vs the prototype in both locales and themes; language switch does NOT replay it; reduced-motion and JS-disabled show the hero instantly; no CLS.

## Step 3 — Scroll reveals: section heads and standalone blocks

```text
Follow the shared rules in context/phase-5-prompts.md.

Build the shared scroll-reveal mechanism (a client wrapper that keeps sections server components) and apply it to the non-grid reveal targets, per the prototype: when a section approaches (~top 78% of the viewport), its head group slides up ~30px and fades in over ~0.8s with a ~0.1s stagger, once, never re-hiding.

Targets: the seven non-hero section heads (business-growth, services, projects, three-d placeholder, about, skills, contact), the about bio paragraph, the contact methods block, and the contact form card. The footer gets no reveal (prototype behavior).

Guarantees: sections already in or above the viewport on load — including landing at /{locale}#section via anchor or the section-preserving language switch — appear instantly without animating; the safety net ensures nothing can stay invisible; scrollspy is unaffected.

Stop for review.
```

Review: trigger points and rhythm vs the prototype scrolling top to bottom; landing at #contact in both locales shows everything; reduced-motion shows all content statically; scrollspy intact.

## Step 4 — Staggered card-grid reveals

```text
Follow the shared rules in context/phase-5-prompts.md.

Extend the Step 3 mechanism to the four card grids, per the prototype: when the section approaches (~top 72%), its cards slide up ~34px and fade in over ~0.75s with a ~0.07s per-card stagger, once.

Grids: business-growth (5 cards), services (6), projects (3), skills (5). Card hover behavior is untouched (Step 5); the same visibility guarantees as Step 3 apply.

Stop for review.
```

Review: stagger rhythm per grid vs the prototype at desktop and mobile; RTL order feels natural; no layout shift while images load in the projects grid; reduced-motion static.

## Step 5 — Hover states: lifts and neon shadows (deferred from Phase 4)

```text
Follow the shared rules in context/phase-5-prompts.md.

Implement the hover states Phase 4 deferred, as pure CSS on the existing card utilities, per the prototype:

1. Cards (growth, services, projects, skills categories): translateY(-5px) lift, accent/40 border, surface-2 background, neon shadow (0 20px 45px -25px accent/.6), ~.4s var(--ease) transitions — extending the plain color transitions already shipped.
2. Card icon chips: stronger accent background, small glow shadow, translateY(-2px).
3. Skill tags: the deferred lift + neon shadow per the prototype's .skill-tag:hover.
4. Contact method rows: the deferred slide along the reading direction (logical properties — slides left in RTL).

Proposal to approve: gate these behind @media (hover: hover) so touch devices don't get sticky hover states (the prototype doesn't gate — flag either way). Note for the summary: confirm the §15.5 interpretation that transient hover feedback is allowed outside the "glow only on" list.

Stop for review.
```

Review: hover feel on every card type vs the prototype, both themes (shadows read differently on light); RTL slide direction; keyboard focus states unchanged; nothing sticky on touch.

## Step 6 — Pointer-follow card glow

```text
Follow the shared rules in context/phase-5-prompts.md.

Implement the prototype's pointer-follow glow: each card's ::after paints a radial accent glow at --mx/--my (percent coordinates, so RTL-safe), visible only while hovered; one document-level passive pointermove listener (a small client component) updates the custom properties on the card under the pointer.

Keep it cheap: passive listener, no re-renders on move (write custom properties directly), no effect on touch devices. Proposal to approve: also disable it under reduced motion.

Stop for review.
```

Review: glow tracks the pointer smoothly on every card type in both themes and directions; no jank while scrolling with the pointer over cards; nothing on touch/reduced-motion.

## Step 7 — Neon pulsing on primary buttons; verify the nav dot

```text
Follow the shared rules in context/phase-5-prompts.md.

1. Add the overview's neon-pulse keyframes (tiny box-shadow amplitude, ease-in-out, cycle ≥ 3s — prototype uses 3.4s) and apply to the primary gradient buttons: the hero "View My Work" CTA and the contact "Send Message" button. Subtle per §15.5 — the pulse must be barely-there, capped by --glow-a in both themes.
2. Verify the Phase 3 active-nav dot-pulse still matches the prototype (2.6s cycle) and stops under reduced motion (Step 1 foundation).
3. Record (no code): the overview lists "pulsing accent when highlighted" for featured service cards, but the prototype doesn't pulse them — excluded per the plan.

Stop for review.
```

Review: pulse subtlety on both buttons in both themes (especially light); ≥ 3s cycles; reduced-motion kills the pulses and the nav dot; nothing else pulses.

## Step 8 — Background orb drift

```text
Follow the shared rules in context/phase-5-prompts.md.

Implement the prototype's gentle scroll-linked orb parallax: orb-1 drifts down ~18% of its height and orb-2 up ~14% across the full page scroll, scrubbed (tied to scroll position, no easing lag needed). Transform-only, on the two existing .bg-orb elements; the grid and radial washes stay fixed.

Keep it imperceptible-but-alive per the overview's "Avoid constant large background movement". Disabled under reduced motion. Verify no scroll jank at 390px.

Stop for review.
```

Review: drift subtlety scrolling the full page, both themes; no jank on mobile width; reduced-motion = static orbs.

## Step 9 — Floating to-top button (optional — my call)

**Decision gate:** the Phase 4 Step 9 footer "Back to top" link shipped instead of the prototype's floating button, with the floating version explicitly deferred here. **Run this prompt to add it, or reply "skip" to keep footer-only** — either way, record the decision in the plan's log.

```text
Follow the shared rules in context/phase-5-prompts.md.

Implement the prototype's floating to-top button: fixed, bottom inline-end (logical — bottom-left in RTL), 44px circle, blurred translucent background, hidden at rest (opacity 0, translateY(12px), pointer-events none) and shown once the page is scrolled past roughly one viewport; smooth-scrolls to top on click (instant under reduced motion); hover = accent ring + soft neon shadow per the prototype.

Reuse the existing Footer back-to-top string as its aria-label — no new strings expected. The footer link stays (the prototype has both). Scroll listener passive and cheap.

Stop for review.
```

Review: show/hide threshold and transition; position in RTL; keyboard focusability while visible only; coexistence with the footer link; reduced-motion instant scroll.

## Step 10 — Mobile animation performance test and final Phase 5 audit

```text
Follow the shared rules in context/phase-5-prompts.md.

Audit the completed phase. Do not restyle or retune approved work unless correcting a clear defect; list suggested changes for approval instead.

Check:
- Every Phase 5 roadmap item and every Phase 4 deferred-to-5 item (listed in context/current-feature.md) is either shipped or explicitly recorded as excluded/skipped in the plan's decision log
- Side-by-side motion pass vs the prototype: hero entrance, all reveals, all hovers, pulses, orb drift — both locales, both themes
- Mobile animation performance (the roadmap item): at 390px with DevTools CPU throttling (4x), scroll the full page — no dropped-frame jank, no long tasks from reveal/pointer/scroll handlers; all animation is transform/opacity-only; zero layout shift from animations
- Reduced-motion end to end (emulated AND macOS Reduce Motion): no entrance, reveals, pulses, drift, or pointer glow anywhere; every piece of content fully visible; anchor scrolling instant
- No-JS check: all content visible
- Regressions: scrollspy through all 8 sections, anchor navigation, section- and theme-preserving language switch, keyboard pass (focus states unchanged by hover work), inert contact form, no horizontal overflow EN/AR × 1440/390
- Lint and build pass

Fix only clear defects found by the audit. Update context/current-feature.md: status Completed, History entry, and anything deferred to Phases 6–8. Do not merge — merging to main happens after my approval. Stop for final review.
```

Review: the audit findings, the throttled-scroll result, and readiness to merge and start Phase 6 (3D Showcase).
