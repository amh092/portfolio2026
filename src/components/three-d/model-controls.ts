import { Box3, MathUtils, PerspectiveCamera, Sphere, Vector3 } from "three";

export interface ViewerControls {
  rotate: (direction: -1 | 1) => void;
  zoom: (direction: -1 | 1) => void;
  reset: () => void;
}

interface DragPointer {
  id: number;
  x: number;
  startX: number;
  startY: number;
  horizontal: boolean;
}

const INITIAL_AZIMUTH = Math.atan2(2.7, 6.4);
const ELEVATION = Math.atan2(0.79, Math.hypot(2.7, 6.4));

export function createViewerControls(
  camera: PerspectiveCamera,
  bounds: Box3,
  invalidate: () => void,
) {
  const radius = bounds.getBoundingSphere(new Sphere()).radius;
  const target = bounds.getCenter(new Vector3());
  let azimuth = INITIAL_AZIMUTH;
  let zoom = 1;
  let active = true;

  function update() {
    if (!active) return;
    const verticalFov = MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * camera.aspect);
    const fitDistance = radius / Math.sin(Math.min(verticalFov, horizontalFov) / 2);
    // Even the closest view contains the full posed bounding sphere at every rotation.
    const distance = fitDistance * 1.3 * zoom;
    camera.position.set(
      Math.sin(azimuth) * Math.cos(ELEVATION) * distance,
      Math.sin(ELEVATION) * distance,
      Math.cos(azimuth) * Math.cos(ELEVATION) * distance,
    ).add(target);
    camera.lookAt(target);
    camera.updateMatrixWorld();
    invalidate();
  }

  const controls: ViewerControls = {
    rotate(direction) {
      azimuth += direction * Math.PI / 12;
      update();
    },
    zoom(direction) {
      zoom = MathUtils.clamp(zoom - direction * 0.1, 0.78, 1.8);
      update();
    },
    reset() {
      azimuth = INITIAL_AZIMUTH;
      zoom = 1;
      update();
    },
  };

  return {
    controls,
    update,
    rotateBy(radians: number) {
      azimuth += radians;
      update();
    },
    dispose() {
      active = false;
    },
  };
}

export function attachModelDrag(canvas: HTMLCanvasElement, rotate: (radians: number) => void) {
  let pointer: DragPointer | null = null;

  function start(event: PointerEvent) {
    if (!event.isPrimary || event.button !== 0) return;
    pointer = {
      id: event.pointerId,
      x: event.clientX,
      startX: event.clientX,
      startY: event.clientY,
      horizontal: event.pointerType !== "touch",
    };
    canvas.setPointerCapture(event.pointerId);
  }

  function move(event: PointerEvent) {
    if (!pointer || event.pointerId !== pointer.id) return;
    if (!pointer.horizontal) {
      const dx = Math.abs(event.clientX - pointer.startX);
      const dy = Math.abs(event.clientY - pointer.startY);
      if (Math.max(dx, dy) < 6) return;
      if (dy > dx) {
        end();
        return;
      }
      pointer.horizontal = true;
    }
    rotate(-(event.clientX - pointer.x) * Math.PI * 2 / Math.max(canvas.clientWidth, 1));
    pointer.x = event.clientX;
  }

  function end() {
    if (pointer && canvas.hasPointerCapture(pointer.id)) canvas.releasePointerCapture(pointer.id);
    pointer = null;
  }

  canvas.addEventListener("pointerdown", start, { passive: true });
  canvas.addEventListener("pointermove", move, { passive: true });
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);
  canvas.addEventListener("lostpointercapture", end);
  return () => {
    end();
    canvas.removeEventListener("pointerdown", start);
    canvas.removeEventListener("pointermove", move);
    canvas.removeEventListener("pointerup", end);
    canvas.removeEventListener("pointercancel", end);
    canvas.removeEventListener("lostpointercapture", end);
  };
}
