# Phase 5 Liveliness Proposal — "Fireworks" Direction

> **Resolved 2026-08-04: Ahmed approved Option A** ("ok do a"). Implemented as Step 2R — effects 1–6 below; §15.5 amendments recorded in `phase-5-plan.md` §4. Options B additions (border arcs, periodic bursts) remain available on request, e.g. at the Step 10 reassessment.

Written 2026-08-04 in response to Ahmed's Step 2 review feedback: *the animation is not satisfying — not pulsing, not shocking/electric; the page should feel alive, like fireworks.* Ahmed picks an option (or mixes) and the phase docs are amended accordingly.

## 1. What the feedback maps to

| Ask | What exists today | What answers it |
|---|---|---|
| "Pulsing" | Nothing on the hero pulses (the nav dot pulses; CTA `neon-pulse` is scheduled for Step 7) | Pull the primary-CTA neon-pulse forward into the hero step; add a breathing (slow-pulsing) hero heading glow |
| "Electric / shocking" | Static heading glow, static gradient text | Gradient shimmer sweeping the hero name; spark effects on the CTA; (Option B) electric border arcs |
| "Fireworks" | — | One-shot spark burst as the entrance finale; (Option B) periodic ambient bursts |
| "Live on the page" | Only the one-shot entrance animates; Steps 3–8 haven't landed yet | A continuous ambient ember/particle field in the hero (not session-gated — always alive); plus everything Steps 3–8 already add |

**Perspective:** most of the page's planned life arrives with the steps not yet built — scroll reveals (3), staggered card grids (4), hover lifts + neon shadows (5), pointer-follow card glow (6), button pulses (7), orb drift (8). Today only the hero entrance exists, so the page under review is at its quietest. The options below add energy *on top of* that pipeline, mostly to the hero (the first impression Ahmed is reacting to).

## 2. Effect palette (building blocks, referenced by the options)

1. **Breathing heading glow** — animate the existing `.hero-title::before` (opacity/scale ~±15%) on a 4s ease-in-out cycle. Within the §15.5 pulse rules (≥ 3s, tiny amplitude, glow already allowed at the hero heading backdrop).
2. **Name gradient shimmer** — a slow highlight band sweeping across the existing gradient text (~6s cycle). Sanctioned by the overview's hero list ("slowly moving gradient").
3. **CTA neon-pulse now** — the prototype's 3.4s box-shadow pulse on "View My Work", pulled forward from Step 7 (Step 7 then just extends it to the contact button and verifies).
4. **Ambient ember field** — a hand-rolled `<canvas>` layer behind the hero copy: accent/indigo specks (1–3px) drifting slowly upward with sway and sine twinkle. ~24–36 particles at 1440, ~12–16 at 390. Runs continuously (not session-gated) — this is the "live on the page" piece. Paused when the hero is offscreen or the tab is hidden; DPR-capped; zero DOM churn; ~100 lines, no new dependency. Overview's hero list allows "small animated background particles".
5. **Entrance finale burst** — once per session, right after the CTA row lands: 10–14 sparks bloom radially from behind the h1 over ~0.9s and fade. The "fireworks moment", reusing the canvas from 4.
6. **CTA spark flare** — on hover/click of the primary CTA: glow flare + 4–6 tiny sparks. Transient interaction feedback (same §15.5 interpretation as the Step 5 hover shadows).
7. **Electric border arc** *(Option B only)* — a bright segment traveling around the primary CTA / featured-card borders on a ~4s loop (animated conic gradient).
8. **Periodic ambient bursts** *(Option B only)* — every 12–18s, a soft 10–14-spark bloom at a random position near the hero/section edges, blooming over ~1.2s.
9. **Punchier entrance** *(optional add-on)* — raise the entrance distance 26px → ~34px and add a slight h1 scale-in (.97 → 1). Departs from prototype timeline values — separate approval.

## 3. Options

### Option A — "Alive but on-brand" (recommended)
Effects **1–6**. The hero pulses, shimmers, sparkles, and stays continuously alive, with one fireworks moment at the entrance finale — while keeping the "premium futuristic minimalism, professional rather than gaming-focused" positioning that the whole design system (and the client-facing pitch of the site) is built on.

- Doc amendments: §15.5 glow list += hero ambient particles/bursts (decorative); pulse list += hero heading glow; overview's "avoid constant large background movement" → "background movement stays subtle and capped (ember drift, orb drift)".
- Prototype remains the behavior source for the original effects; this proposal is the spec for the new layer.

### Option B — "Full fireworks" (the literal ask)
Everything in A **plus 7–8**, with a denser ember field. Maximum energy.

- Honest flags: this pushes past "restrained, professional" into showy territory the overview explicitly avoided ("futuristic without appearing excessive"); it competes with content for attention on a site meant to sell client work; and it grows the mobile performance budget right before the Step 10 throttled-scroll gate. Spec'd faithfully if chosen — but A is the recommendation.
- Doc amendments: as A, plus rewriting the overview's neon-restraint paragraphs and §15.5 more broadly.

### Option C — "Sequence first" (cheapest)
Ship Steps 3–8 as planned, then judge at Step 10 whether the page still needs A/B on top. No rule changes now. Risk: the hero — the first impression — stays quiet for the whole phase.

**Recommendation: A now (as a revised Step 2), continue Steps 3–8 unchanged, reassess at the Step 10 audit whether anything from B is still wanted.** A + the existing pipeline likely lands the feeling Ahmed wants without sacrificing the professional positioning.

## 4. Non-negotiable guardrails (all options)

- **Reduced motion kills everything** — CSS effects via the foundation + explicit gates; the canvas loop never even starts under `prefers-reduced-motion` (roadmap + WCAG requirement; unchanged).
- **No strobing** — nothing flashes more than ~2×/second (WCAG 2.3.1 seizure threshold is 3/s); bursts bloom and fade, they don't strobe. "Shocking electric" is achieved with brightness/motion design, never flicker.
- **Readability** — particles/bursts render behind the copy at low alpha; no glow behind body text (§15.5's most protective rule stays in all options).
- **Performance** — transform/opacity-only DOM animation; one rAF loop for all canvas work, paused offscreen/hidden; particle counts halved ≤ 768px; total added JS ≲ 3 KB; must pass the Step 10 mobile test (390px, 4× CPU throttle, no dropped-frame jank).
- **Content never hostage to JS** — the canvas is purely additive; SSR markup stays fully visible; the entrance safety net returns to a ≤ 2s worst-case window (the gate timeout is re-tuned in the implementation step, and the session replay-guard is restored).
- **No new dependencies** — canvas is hand-rolled; Motion/CSS for the rest (stack table unchanged).

## 5. What happens after Ahmed picks

1. This proposal's chosen option is recorded in `phase-5-plan.md` (decision log + scope), and §15.5 / overview amendments are written down explicitly.
2. Step 2 is re-run as **Step 2R — "Hero alive"**: current entrance (with its 250ms lead-in) + the chosen effects, implemented, verified (both locales/themes/widths, reduced-motion, no-JS, perf), and stopped for review like any step.
3. Steps 3–8 proceed unchanged; Step 7 shrinks if effect 3 ships early; Step 10 audits the whole result against the amended rules.
