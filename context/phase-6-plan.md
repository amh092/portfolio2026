# Phase 6 Plan — Interactive 3D Showcase

Approved content: `phase-1-plan.md` §§10–11 and §16. Presentation: `ahmed-portfolio-prototype.html` and `styling-reference.md`. Requirements: `project-overview.md` §6 and Phase 6 roadmap. One reviewable step per prompt in `phase-6-prompts.md`.

## 1. Status

In Progress — Step 4 implementation and verification underway on `feature/three-d-showcase`; stop for user review after this step. Step 3's static cards and typed content are committed as `fe92d29`, accepted for progression via "next" on 2026-10-06. Step 2 is committed as `5d06cf6`, accepted via "next step" on 2026-10-04. Step 1 is committed as `5ad25a6`, accepted via "do what is required now" on 2026-10-04. Phase 5 was approved via "next" and fast-forward merged into local `main` at `299036f` on 2026-10-03 after lint/build passed. Its native macOS Reduce Motion check remains deferred to Phase 8. The animation branch is retained; no remote push has been performed.

## 2. Steps

| Step | Deliverable | Status |
| --- | --- | --- |
| 1 | Phase setup, compatible Three.js/Fiber/Drei dependencies, source inventory | Committed `5ad25a6`; accepted for progression 2026-10-04 |
| 2 | Prepare optimized GLBs and capture three WebP preview/fallback stills | Committed `5d06cf6`; accepted for progression 2026-10-04 |
| 3 | Typed model content and static showcase cards, approved EN/AR copy | Committed `fe92d29`; accepted for progression 2026-10-06 |
| 4 | Explicit-load viewer with one active model, rotate/zoom/reset controls | In progress 2026-10-06; verification pending |
| 5 | Loading progress, retry/error handling, WebGL and context-loss fallbacks | Not started |
| 6 | Model animation, live reduced-motion handling, offscreen/hidden-tab pausing and resource cleanup | Not started |
| 7 | Full showcase audit: accessibility, performance, network behavior and page regressions | Not started |

Each implementation step includes appropriate build, lint, browser, and reduced-motion checks. Basic accessible controls and safe error behavior belong in their first implementation; later steps complete and stress-test them. Stop for review after each step.

## 3. Approved scope and implementation decisions

- All three Insally stage robots, using names/descriptions/tools from §11 verbatim. They are Meshy AI-generated models; Ahmed's demonstrated work is interactive web integration.
- Source files are read-only references. Work on copies in the portfolio; exclude original unoptimized GLBs.
- Static previews appear before interaction. Import the browser-only renderer and fetch the selected GLB only after the visitor activates its load control. No module-level preloading of all models.
- Keep section content server-rendered. Use small client components for selection, loading, and the renderer; place `next/dynamic` with `ssr: false` inside a client boundary per the installed Next.js guide.
- One active viewer/model at a time. Switching returns the previous card to its static preview and releases renderer/model resources. Confirm actual network and cleanup behavior in browser checks.
- Rotate, zoom, and reset controls must support keyboard/touch; scrolling the page must remain usable on mobile. New control/status strings will be proposed in both locales in the relevant step.
- Reduced motion keeps previews and controls usable, disables automatic model motion, and responds to preference changes. Pause rendering offscreen and in hidden tabs. Render on demand whenever continuous motion is unnecessary.
- Preserve the prototype's dark viewer surface, subtle neon edge, and tool/hint treatment. Use existing tokens and approved Phase 5 reveal behavior. Avoid card hover transforms that interfere with manipulating a loaded viewer.
- No expensive post-processing or real-time shadows by default. Tune resolution after measurement; do not claim desktop throttling is a physical-device GPU test.
- Optional fullscreen and additional scenes are excluded. Contact functionality remains Phase 7; launch work and the native macOS motion check remain Phase 8.

## 4. Source inventory — verified 2026-10-03

Source root: `/Users/ahmed/Projects/react/insally/public/models/`.

| Source | Portfolio destination | Bytes | Vertices | Triangles |
| --- | --- | ---: | ---: | ---: |
| `primary-optimized.glb` | `public/models/robot-primary.glb` | 2,154,776 | 12,376 | 9,841 |
| `intermed-optimized.glb` | `public/models/robot-middle.glb` | 1,956,696 | 13,750 | 10,555 |
| `highschool-optimized.glb` | `public/models/robot-highschool.glb` | 2,180,440 | 12,633 | 10,499 |

All three source files are self-contained GLB 2 files with one skinned mesh and ten animation clips. Required source extension: `EXT_texture_webp`; optional: `KHR_materials_specular`. Embedded textures are 1024×1024 WebP. The sources need no Draco or Meshopt decoder; the prepared portfolio copies additionally require Meshopt as recorded below.

Shared clips: `Agree_Gesture`, `Backflip`, `Big_Wave_Hello`, `Jump_with_Arms_Open`, `Motivational_Cheer`, `Running`, `Show_Both_Arm_Muscles`, `Stand_Up10`, `Victory_Cheer`, `Walking`. Select a suitable subtle clip only after visual inspection; do not autoplay vigorous clips by default.

Primary and high-school sources each contain two byte-identical embedded images (315,906 and 317,460 bytes respectively). Step 2 evaluated deduplication and further meshopt/Draco compression against fidelity, animation integrity, and decoder cost; the final copies use texture deduplication and lossless Meshopt. Unlike the sources, the final GLBs require the Meshopt decoder. Full results and integration instructions: `phase-6-assets.md`.

Step 2 captured 800×600 WebP stills at `public/images/three-d/robot-{primary,middle,highschool}.webp` (20–22 KB each), directly from the prepared models. Apply the approved stage-specific alt text when integrating the cards in Step 3.

Insally reference code flags integration concerns to verify: skinned-model normalization can be affected by armature scaling, animation root motion can shift a robot out of frame, and skinned-mesh frustum culling can cause disappearing parts. Inspect `components/robot/three/robot-model-normalization.ts`, `components/robot/review/RobotsReviewScene.tsx`, and the culling treatment in `components/garden/TeamRobots.tsx` when implementing the viewer; do not copy unrelated garden behavior or global preloads. Preserve the authored emissive, transparent, double-sided materials during optimization and verify their appearance.

Use a model-owned `AnimationMixer` as approved in §11.1. Define skeleton-safe clone and loader-cache ownership before disposal so a switched-out model cannot leave disposed geometry/materials in a reusable cache.

## 5. Dependency and documentation record

Installed versions: `three@0.186.1`, `@react-three/fiber@9.8.1`, `@react-three/drei@10.7.9`, and development-only `@types/three@0.186.0`. Fiber 9 and Drei 10 peer ranges accept this project's React 19.2.8; `npm ls` confirms shared React/Three instances with no peer conflict. The lockfile records exact resolutions. No existing locked package changed version.

- [Fiber installation and React major compatibility](https://r3f.docs.pmnd.rs/getting-started/installation)
- [Drei official documentation](https://drei.docs.pmnd.rs/getting-started/introduction)
- Installed Next.js guide: `node_modules/next/dist/docs/01-app/02-guides/lazy-loading.md`.

Do not change Next.js transpilation settings preemptively; verify the actual client imports when implementing the renderer and address any observed compatibility issue.

Dependency audit on 2026-10-03 reports 11 affected packages (10 high, 1 critical), all already present at the same versions in Phase 5 commit `299036f`. None of the newly added 3D packages appears in that audit. Affected packages: Next.js, its nested PostCSS and Sharp, Nano ID, js-yaml, brace-expansion, braces, micromatch, fast-glob, @next/eslint-plugin-next, and eslint-config-next. The critical Next.js findings include image-processing and `next/og` advisories; the prior Phase 5 record of three high advisories is no longer the current count. Dependency remediation remains tracked in Phase 8 before deployment; no blind `audit fix`, forced downgrade, or unrelated upgrade was applied. Session evidence: `/tmp/portfolio-phase6-audit.json`.

## 6. Final audit requirements

- EN/AR × dark/light × 1440/390px; approved copy and accessible names, correct RTL layout, no horizontal overflow.
- Static previews with JavaScript disabled; complete model information without WebGL or after an error.
- No GLB or 3D-renderer request before explicit load; only the selected model requested. Switching/retrying does not leak renderers, mixers, listeners, or GPU resources.
- Loading on a slow connection, failed GLB requests, retry, unavailable WebGL, and context loss/recovery have visible usable states.
- Keyboard focus/order and rotate/zoom/reset behavior; touch interaction without trapping page scroll.
- Initial/live reduced motion; hidden-tab and offscreen pausing; animation resumes only when permitted and visible.
- Model fit, lighting, pose, and animation integrity for every asset. No clipping or root-motion escape.
- Mobile performance measured with stated viewport, DPR and throttle; observe layout shifts, long tasks, and rendering cost. Record physical-device limitations honestly.
- Existing scrollspy/anchors, locale/theme preservation, Phase 5 animations and inert contact form remain correct.
- Lint/build pass; document deferred items and stop for final review before merge.

## 7. Step 1 verification — 2026-10-03

- Installed the four planned packages; `npm ls` passes with one resolved React, Fiber, and Three version. Existing locked versions are unchanged.
- `npm run lint` and production `npm run build` pass, including TypeScript and both locale routes.
- **8/8 production-browser smoke scenarios pass:** EN/AR × dark/light × 1440/390px with reduced motion emulated. Correct locale/direction/theme, eight sections, visible headings, inert contact form, no horizontal overflow, page errors, or model requests. The 3D section remains its existing heading until Step 3.
- Inspected English desktop dark and Arabic mobile light screenshots; existing presentation is intact. No application source or message changes in this setup step.
- This verifies setup and existing-page compatibility; actual renderer imports, WebGL behavior, and GLB decoding will be verified when the viewer/assets are implemented.
- Independent read-only review confirmed approved scope and asset inventory; animation ownership, culling, and material-fidelity concerns are recorded above.
- Session evidence: `/tmp/phase6-setup-smoke.json` and `/tmp/phase6-setup-{en-dark-1440,ar-light-390}.png`. Production preview: `http://127.0.0.1:3101`.
- Step 1 was subsequently committed as `5ad25a6`; this corrects the earlier stale uncommitted status.

## 8. Step 2 verification — 2026-10-04

- Prepared all three final GLBs and 800×600 WebP previews; model bytes reduced by 31.4% overall, from 6,291,912 to 4,315,004. Sources are unchanged; no application/dependency/message changes.
- Compared deduplication, lossless Meshopt, 16-bit Meshopt, and 16-bit Draco. Selected lossless Meshopt after independent decoded-data equivalence checks and pixel-identical source/candidate captures. Geometry attributes, skeletons, materials/textures, and all ten clips are preserved.
- Rendered all 15 source/candidate combinations and sampled 750 clip poses. Re-rendered the three final public GLBs and inspected all three encoded WebPs. Zero browser exceptions; Khronos validator limitations and the pre-existing skin-parent warning are recorded in `phase-6-assets.md`.
- Lint/build pass; 8/8 production browser scenarios pass across both locales/themes and 1440/390px, plus all three final model/image checks. These asset checks do not establish physical-device performance or the later viewer lifecycle behavior.
- Final files, hashes, size comparisons, capture settings, and the required on-demand Meshopt decoder integration are documented in `phase-6-assets.md` and `phase-6-asset-manifest.json`.
- Step 2 was subsequently committed as `5d06cf6` and accepted via "next step" on 2026-10-04; this corrects the earlier stale uncommitted status.

## 9. Step 3 implementation record — 2026-10-06

- Commit `fe92d29` adds typed model content in `src/types/three-d-project.ts` and `src/data/three-d-projects.ts`, plus three server-rendered static showcase cards with the prepared previews, approved EN/AR copy and alt text, and technology badges.
- Accepted for progression via "next" on 2026-10-06. No separate Step 3 verification results are recorded here; Step 4 verification covers the integrated cards and viewer.

## 10. Step 4 — in progress 2026-10-06

- Implement the explicit-load viewer and one-active-model selection, with rotate/zoom/reset controls and a return-to-preview action. Keep approved model content server-rendered and load the renderer, Meshopt decoder, and selected GLB only on activation.
- Verification pending: lint/build, pre-activation network isolation, all three model loads, switching and cleanup, keyboard/touch controls, static no-JS content, both locales/themes, responsive layout, and basic unavailable state.
- Loading progress/retry/context-loss hardening remains Step 5; model animation and offscreen/hidden-tab lifecycle work remains Step 6; the full performance/accessibility audit remains Step 7.
- Stop for user review after Step 4. New interface copy below is drafted for approval; approved model titles/descriptions are reused verbatim.

### New Step 4 interface strings — pending approval

| `ThreeD` key | English | Arabic |
| --- | --- | --- |
| `load` | Load 3D model | تحميل النموذج ثلاثي الأبعاد |
| `loadAria` | Load 3D model — {model} | تحميل النموذج ثلاثي الأبعاد — {model} |
| `viewerLabel` | 3D view — {model} | عرض ثلاثي الأبعاد — {model} |
| `loading` | Loading 3D view… | جارٍ تحميل العرض ثلاثي الأبعاد… |
| `hint` | Drag sideways to rotate. Use the buttons to zoom. | اسحب أفقياً للتدوير، واستخدم الأزرار للتقريب والإبعاد. |
| `unavailable` | The 3D view is unavailable. You can still view the preview. | العرض ثلاثي الأبعاد غير متاح. يمكنك مشاهدة الصورة الثابتة. |
| `rotateLeft` | Rotate left | تدوير لليسار |
| `rotateRight` | Rotate right | تدوير لليمين |
| `zoomIn` | Zoom in | تقريب |
| `zoomOut` | Zoom out | إبعاد |
| `reset` | Reset view | إعادة ضبط العرض |
| `returnToPreview` | Return to preview | العودة إلى الصورة الثابتة |
| `returnToPreviewAria` | Return to preview — {model} | العودة إلى الصورة الثابتة — {model} |
