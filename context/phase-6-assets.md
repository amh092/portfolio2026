# Phase 6 · Step 2 — Prepared robot assets

Verified 2026-10-04. Six final assets are ready for Step 3. Sources remain unchanged; no application code, messages, or dependencies changed. Hashes and exact experiment sizes are retained in [the asset manifest](phase-6-asset-manifest.json).

## Final files

| Stage | Model path | Source bytes | Prepared bytes | Preview path | Preview bytes |
| --- | --- | ---: | ---: | --- | ---: |
| Primary | `public/models/robot-primary.glb` | 2,154,776 | 1,386,276 | `public/images/three-d/robot-primary.webp` | 21,138 |
| Middle | `public/models/robot-middle.glb` | 1,956,696 | 1,504,244 | `public/images/three-d/robot-middle.webp` | 21,924 |
| High-school | `public/models/robot-highschool.glb` | 2,180,440 | 1,424,484 | `public/images/three-d/robot-highschool.webp` | 20,374 |

Combined GLBs: **6,291,912 → 4,315,004 bytes (31.4% smaller)**. Each remains self-contained, with one skinned mesh, 24 joints, ten named animation clips, and embedded 1024×1024 WebP texture data. The three previews total 63,436 bytes.

## Optimization decision

Selected texture/accessor deduplication followed by lossless Meshopt encoding. Primary and high-school each shared byte-identical base-color/emissive images; these now reference one embedded image. Middle already had one image. No texture recompression, mesh simplification, keyframe resampling, or numeric quantization was applied.

| Method | Primary bytes | Middle bytes | High-school bytes | Decision |
| --- | ---: | ---: | ---: | --- |
| Deduplication only | 1,838,688 | 1,956,588 | 1,862,696 | Exact appearance, but larger downloads |
| Lossless Meshopt | 1,386,276 | 1,504,244 | 1,424,484 | Selected; exact geometry attributes, skins, motion and appearance |
| 16-bit Meshopt | 1,182,840 | 1,280,196 | 1,209,908 | Smaller, but changes geometry/inverse-bind transforms and rendered pixels |
| 16-bit Draco | 1,372,104 | 1,436,212 | 1,387,916 | Small additional savings; lossy geometry and larger decoder |

The chosen extension requires the existing Three.js Meshopt decoder (29,256 raw bytes; 7,804 gzip; 6,928 Brotli). Draco requires a 58,456-byte wrapper and 192,420-byte WASM file, plus DRACOLoader. These are local file-size comparisons, not measured production transfer sizes. No new runtime package is needed.

Preparation used temporary tooling only: `@gltf-transform/{core,extensions,functions}@4.5.1`, `meshoptimizer@1.3.0`, `draco3dgltf@1.5.7`, and `gltf-validator@2.0.0-dev.3.10`. The selected transform is reproducible with the following configuration after registering `ALL_EXTENSIONS` and the Meshopt encoder/decoder with `NodeIO`:

```js
await document.transform(dedup({
  propertyTypes: [PropertyType.TEXTURE, PropertyType.ACCESSOR],
}));
document.createExtension(EXTMeshoptCompression)
  .setRequired(true)
  .setEncoderOptions({method: EXTMeshoptCompression.EncoderMethod.QUANTIZE});
const prepared = await io.writeBinary(document);
```

Here the encoder method's name does not apply numeric quantization by itself: no `quantize()` or `meshopt()` transform is used. Decoded attribute arrays, inverse-bind matrices, and animation accessors were compared byte-for-byte. Meshopt cyclically rotates some triangle indices while preserving triangle order and winding.

## Preview capture

Each WebP is **800×600 (4:3)**, Sharp quality 92 / effort 6, captured from the actual prepared model. All use `Agree_Gesture` at 0.6 seconds, a three-quarter view, the same lighting, and a dark blue radial background. Full robot silhouettes are visible without cropping; all three final WebPs were inspected after encoding.

The temporary viewer uses Three.js 0.186.1, ACES filmic tone mapping with exposure 1, sRGB output, antialiasing, DPR 1, and a 32° perspective camera at `(2.7, 1.95, 6.4)` looking at `(0, 1.16, 0)`. Models are centered and scaled to 2.4 units high using actual posed vertex bounds after world/skeleton updates. Lighting: hemisphere intensity 1, warm directional key 2.1, cool fill 1.2, and RoomEnvironment intensity 0.45. Background colors: `#192a47`, `#111b2e`, `#0e1118`.

Use the approved stage-specific alt text from Phase 1 §16 when integrating the cards. This step adds no interface copy. The captured gesture pose does not approve autoplay; Step 6 must inspect the complete animation before choosing automatic motion.

## Fidelity and verification

- Independently re-hashed all source/candidate files. Source SHA-256 values before and after preparation match. Final public GLBs match the verified candidates.
- Decoded the selected files with the exact Meshopt decoder bundled with this project's Three.js. Geometry attributes, skins/nodes, animation channels, materials, sampler settings, and embedded image bytes match the source. Triangle order/winding is preserved.
- Rendered all 15 source/optimization combinations in an isolated headless Chrome viewer. Each model's ten clips was sampled at 0%, 25%, 50%, 75%, and 99% duration: **750 finite rendered poses**, zero browser exceptions. This checks decoding and sampled animation integrity, not full-clip presentation or physical-device performance.
- All three selected candidates produce **pixel-identical 800×600 PNG renders** to their source at the capture pose, and identical posed bounds at all 50 sampled clip/time combinations per model. The final public GLBs were rendered again with identical captures.
- Khronos validation reports zero errors for each candidate. The existing `NODE_SKINNED_MESH_NON_ROOT` warning remains; compressed files also report `UNSUPPORTED_EXTENSION` because this validator cannot validate Meshopt payloads. Independent decoded-data comparisons and browser checks cover that limitation.
- Preserve authored `BLEND`, double-sided rendering, emissive factor `[1,1,1]`, and specular color `[2,2,2]`. No material override was used to hide a fidelity issue.
- `npm run lint` and `npm run build` pass. **8/8 production page checks** pass: EN/AR × dark/light × 1440/390, with reduced motion emulated; correct locale/theme/direction, eight sections, visible headings, inert contact form, no overflow, no page exceptions, and no initial GLB requests. All three final preview images decode at 800×600.
- All six final asset URLs return HTTP 200 from the Next.js production preview with the expected MIME types, byte lengths, and SHA-256 values.

## Viewer integration requirements

Both `EXT_meshopt_compression` and `EXT_texture_webp` are required by the final GLBs; `KHR_materials_specular` remains optional. Configure `GLTFLoader.setMeshoptDecoder(MeshoptDecoder)` using `three/addons/libs/meshopt_decoder.module.js` inside the explicitly loaded renderer. Do not import or preload the renderer/decoder at page load. [Three.js documents the loader requirement](https://threejs.org/docs/pages/GLTFLoader.html).

Use posed-vertex bounds after updating world and skeleton matrices; the source armature/bind transforms make blindly copied geometry/world-bound shortcuts unreliable. Pin root X/Z motion when needed, and verify the selected animation remains framed. The capture viewer disables skinned-mesh frustum culling. Later viewer work must handle bounds/culling and resource disposal deliberately, including shared image bitmaps; see [Three.js SkinnedMesh bounds documentation](https://threejs.org/docs/pages/SkinnedMesh.html).

Temporary reproduction/evidence files: `/tmp/portfolio-model-optimization/{optimize.mjs,report.json,independent-review.json}`; `/tmp/portfolio-model-capture/{index.html,viewer.js,server.cjs,check.cjs,browser-report.json,comparisons.json,final-check.cjs}`; `/tmp/phase6-assets-smoke.json`. These temporary files are not required at runtime. The manifest above retains the durable hashes, sizes, and verification results.
