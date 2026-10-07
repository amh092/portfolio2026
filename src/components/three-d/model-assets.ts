import {
  AnimationMixer,
  Box3,
  BufferGeometry,
  Group,
  Material,
  Mesh,
  Object3D,
  Skeleton,
  SkinnedMesh,
  Texture,
  Vector3,
} from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/addons/libs/meshopt_decoder.module.js";
import type { ModelLoadProgress } from "./model-status";

type ModelResource = BufferGeometry | Material | Skeleton | Texture;

function getDownloadTotal(response: Response) {
  const encoding = response.headers.get("content-encoding")?.trim().toLowerCase();
  const length = response.headers.get("content-length");
  // Fetch exposes decoded bytes; compressed Content-Length describes different bytes.
  // A cross-origin response may also hide its encoding header from JavaScript.
  if (response.type === "cors" || (encoding && encoding !== "identity") || !length) return;
  if (!/^\d+$/.test(length)) return;
  const total = Number(length);
  return Number.isSafeInteger(total) && total > 0 ? total : undefined;
}

async function readModelBytes(
  response: Response,
  signal: AbortSignal,
  onProgress: (progress: ModelLoadProgress) => void,
) {
  let total = getDownloadTotal(response);
  let loaded = 0;
  onProgress({ stage: "downloading", loaded, total });
  if (!response.body) {
    const bytes = await response.arrayBuffer();
    signal.throwIfAborted();
    onProgress({
      stage: "downloading",
      loaded: bytes.byteLength,
      total: total === bytes.byteLength ? total : undefined,
    });
    return bytes;
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let lastProgressAt = -Infinity;
  try {
    while (true) {
      const { done, value } = await reader.read();
      signal.throwIfAborted();
      if (done) break;
      chunks.push(value);
      loaded += value.byteLength;
      if (total !== undefined && loaded > total) total = undefined;
      const now = performance.now();
      if (now - lastProgressAt >= 120) {
        onProgress({ stage: "downloading", loaded, total });
        lastProgressAt = now;
      }
    }
  } catch (error) {
    await reader.cancel().catch(() => {});
    throw error;
  } finally {
    reader.releaseLock();
  }
  onProgress({ stage: "downloading", loaded, total: total === loaded ? total : undefined });

  const bytes = new Uint8Array(loaded);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes.buffer;
}

/** Each load owns its assets; no useGLTF/useLoader cache or shared clones. */
function createResourceOwner() {
  const resources = new Set<ModelResource>();
  const bitmaps = new Set<ImageBitmap>();
  let disposed = false;

  function release(resource: ModelResource) {
    resource.dispose();
    if (!(resource instanceof Texture)) return;
    const image: unknown = resource.source.data;
    if (
      typeof ImageBitmap !== "undefined" &&
      image instanceof ImageBitmap &&
      !bitmaps.has(image)
    ) {
      bitmaps.add(image);
      image.close();
    }
  }

  function track(value: unknown): void {
    if (Array.isArray(value)) {
      value.forEach(track);
    } else if (value instanceof Object3D) {
      value.traverse((object) => {
        if (object instanceof Mesh) {
          track(object.geometry);
          track(object.material);
        }
        if (object instanceof SkinnedMesh) track(object.skeleton);
      });
    } else if (
      value instanceof BufferGeometry ||
      value instanceof Material ||
      value instanceof Skeleton ||
      value instanceof Texture
    ) {
      if (resources.has(value)) return;
      resources.add(value);
      if (value instanceof Material) Object.values(value).forEach(track);
      if (disposed) release(value);
    }
  }

  return {
    track,
    dispose() {
      if (disposed) return;
      disposed = true;
      resources.forEach(release);
    },
  };
}

/** Track individual dependencies too, so a failed/abandoned parse releases late assets. */
export function createModelLoader() {
  const owner = createResourceOwner();
  const loader = new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);
  loader.register((parser) => {
    const getDependency = parser.getDependency.bind(parser);
    parser.getDependency = (type, index) =>
      getDependency(type, index).then((value: unknown) => {
        owner.track(value);
        return value;
      });
    const loadGeometries = parser.loadGeometries.bind(parser);
    parser.loadGeometries = (primitives) =>
      loadGeometries(primitives).then((geometries) => {
        owner.track(geometries);
        return geometries;
      });
    return { name: "portfolio_resource_ownership" };
  });

  return {
    async load(
      url: string,
      signal: AbortSignal,
      onProgress: (progress: ModelLoadProgress) => void,
    ) {
      onProgress({ stage: "downloading", loaded: 0 });
      const response = await fetch(url, { signal });
      if (!response.ok) throw new Error("The model could not be downloaded.");
      const bytes = await readModelBytes(response, signal, onProgress);
      signal.throwIfAborted();
      onProgress({ stage: "preparing" });
      const basePath = new URL(".", new URL(url, location.href)).href;
      const model = await loader.parseAsync(bytes, basePath);
      model.scenes.forEach(owner.track);
      signal.throwIfAborted();
      return model;
    },
    dispose: owner.dispose,
  };
}

export function getPosedBounds(model: Object3D) {
  const bounds = new Box3();
  const vertex = new Vector3();
  model.updateMatrixWorld(true);
  model.traverse((object) => {
    if (!(object instanceof Mesh)) return;
    if (object instanceof SkinnedMesh) object.skeleton.update();
    const positions = object.geometry.getAttribute("position");
    for (let index = 0; index < positions.count; index++) {
      object.getVertexPosition(index, vertex).applyMatrix4(object.matrixWorld);
      bounds.expandByPoint(vertex);
    }
  });
  if (bounds.isEmpty() || ![...bounds.min, ...bounds.max].every(Number.isFinite)) {
    throw new Error("The model has invalid bounds.");
  }
  return bounds;
}

export function prepareModel(model: GLTF) {
  const mixer = new AnimationMixer(model.scene);
  const group = new Group();
  group.add(model.scene);
  model.scene.traverse((object) => {
    if (object instanceof Mesh) object.frustumCulled = false;
  });

  // Sample the preview's pose once. No animation clock runs in this step.
  const hips = model.scene.getObjectByName("Hips");
  const rootPosition = hips?.position.clone();
  const clip = model.animations.find((animation) => animation.name === "Agree_Gesture");
  if (clip) {
    mixer.clipAction(clip).play();
    mixer.setTime(0.6);
    if (hips && rootPosition) {
      hips.position.x = rootPosition.x;
      hips.position.z = rootPosition.z;
    }
  }

  const bounds = getPosedBounds(group);
  const center = bounds.getCenter(new Vector3());
  const height = bounds.max.y - bounds.min.y;
  if (height <= 0) throw new Error("The model has no height.");
  const scale = 2.4 / height;
  group.scale.setScalar(scale);
  group.position.copy(center).multiplyScalar(-scale);
  const normalizedBounds = getPosedBounds(group);

  return {
    group,
    bounds: normalizedBounds,
    dispose() {
      mixer.stopAllAction();
      mixer.uncacheRoot(model.scene);
      group.removeFromParent();
    },
  };
}
