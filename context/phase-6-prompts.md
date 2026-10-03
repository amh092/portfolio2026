# Phase 6 — Reviewable Prompts

Follow `context/ai-interaction.md`, `coding-standards.md`, `phase-6-plan.md`, `styling-reference.md`, and the approved model content in `phase-1-plan.md` §§10–11/16. Read relevant installed Next.js guides and current official library documentation before implementing APIs. Work on `feature/three-d-showcase`; one step per prompt. Do not commit without permission.

For each implementation step: run lint/build and appropriate browser checks; verify both locales/themes and 1440/390px when the UI changes. Keep content usable with reduced motion. Update the plan, current-feature history, progress log, and remaining-task headlines. Report any new EN/AR interface strings for review. Stop after the requested step.

## Step 1 — Phase setup and dependencies

Record Phase 5 approval and merge, create the Phase 6 branch, document the phase plan, install compatible Three.js/Fiber/Drei packages and TypeScript definitions, and inventory the three approved model sources. Keep the existing page presentation intact. Verify dependency resolution, lint/build, and a brief browser smoke check. Stop for Step 1 review.

## Step 2 — Model assets and preview images

Prepare portfolio copies of the approved optimized GLBs. Evaluate duplicate textures and further compression without altering source files. Validate clips, skins, model appearance, and the cost of any decoder. Capture three consistent ~800px WebP preview/fallback stills from the actual models using a temporary viewer. Inspect every image and render every prepared GLB. Record file sizes, optimization decisions, and fidelity results. Stop for review.

## Step 3 — Static showcase cards

Add the typed 3D project data with approved titles, descriptions, tools, paths, and image alt text. Fill the `three-d` section with server-rendered static cards using prepared previews and the prototype's presentation. Keep all information visible without JavaScript. Reuse the existing grid/reveal conventions where appropriate. Propose only necessary new interface strings. Stop for review.

## Step 4 — On-demand viewer and controls

Add a browser-only renderer loaded after an explicit visitor action, with one selected model/viewer at a time. Fit every skinned model correctly and provide accessible rotate/zoom/reset controls, touch behavior, and a return to preview. Keep a static fallback available. Verify no renderer/model prefetch before activation, only the requested model loads, and selection changes cleanly release the previous viewer. Keep models still until Step 6 adds their motion. Stop for review.

## Step 5 — Loading and resilient fallbacks

Complete localized loading progress, errors/retry, unsupported-WebGL handling, and context-loss behavior. Keep the preview and model information useful throughout. Verify slow/failed requests, repeated retry, switching while loading, no-JS, and missing WebGL; distinguish bytes loaded from asset preparation instead of reporting misleading completion. Stop for review.

## Step 6 — Animation and rendering lifecycle

Add a suitable inspected model clip, with a model-owned AnimationMixer, a visible pause/play control, and live reduced-motion support. Keep automatic motion off under reduced motion. Pause rendering/mixers offscreen and in hidden tabs, use demand rendering when still, and release resources on close/switch/unmount without leaving disposed resources in a reusable loader cache. Verify framing during animation, root-motion/culling behavior, keyboard/touch access, repeated switches, and mobile cost. Stop for review.

## Step 7 — Final Phase 6 audit

Run the audit requirements in `phase-6-plan.md` §6. Compare the presentation with the prototype while preserving approved content. Measure performance and network behavior; audit fallback/accessibility states and existing page regressions. Fix clear defects only, record remaining Phase 7/8 work, and mark Phase 6 Completed when its scope is verified. Stop for final review; merge only after approval.
