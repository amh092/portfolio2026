"use client";

import { useEffect, useRef } from "react";
import {
  createRoot,
  type ReconcilerRoot,
  type RootStore,
} from "@react-three/fiber";
import {
  ACESFilmicToneMapping,
  DirectionalLight,
  HemisphereLight,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
  type WebGLRenderTarget,
} from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createModelLoader, prepareModel } from "./model-assets";
import {
  attachModelDrag,
  createViewerControls,
  type ViewerControls,
} from "./model-controls";

export type { ViewerControls } from "./model-controls";

interface ModelRendererProps {
  modelUrl: string;
  label: string;
  onReady: (controls: ViewerControls) => void;
  onError: () => void;
}

function lightScene(scene: Scene, renderer: WebGLRenderer) {
  const key = new DirectionalLight(0xfff2df, 2.1);
  key.position.set(3, 5, 4);
  const fill = new DirectionalLight(0x8bbcff, 1.2);
  fill.position.set(-4, 2, 2);
  scene.add(new HemisphereLight(0xd9e7ff, 0x334057, 1), key, fill);
  const room = new RoomEnvironment();
  const generator = new PMREMGenerator(renderer);
  try {
    const environment = generator.fromScene(room, 0.04);
    scene.environment = environment.texture;
    scene.environmentIntensity = 0.45;
    return environment;
  } finally {
    room.dispose();
    generator.dispose();
  }
}

/** Imported only after explicit activation; every mount has its own canvas and resources. */
export default function ModelRenderer({
  modelUrl,
  label,
  onReady,
  onError,
}: ModelRendererProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const canvas = document.createElement("canvas");
    canvas.className =
      "block h-full w-full cursor-grab touch-pan-y touch-pinch-zoom select-none active:cursor-grabbing";
    canvas.setAttribute("role", "img");
    canvas.setAttribute("aria-label", label);
    host.appendChild(canvas);

    const abort = new AbortController();
    const loader = createModelLoader();
    const scene = new Scene();
    const camera = new PerspectiveCamera(32, 1, 0.01, 100);
    let stopped = false;
    let renderer: WebGLRenderer | undefined;
    let root: ReconcilerRoot<HTMLCanvasElement> | undefined;
    let store: RootStore | undefined;
    let environment: WebGLRenderTarget | undefined;
    let model: ReturnType<typeof prepareModel> | undefined;
    let controller: ReturnType<typeof createViewerControls> | undefined;
    let observer: ResizeObserver | undefined;
    let removeDrag: (() => void) | undefined;

    function dispose() {
      if (stopped) return;
      stopped = true;
      abort.abort();
      observer?.disconnect();
      removeDrag?.();
      canvas.removeEventListener("webglcontextlost", fail);
      controller?.dispose();
      const state = store?.getState();
      if (state) {
        state.setFrameloop("never");
        state.set({ internal: { ...state.internal, active: false, frames: 0 } });
      }
      model?.dispose();
      loader.dispose();
      scene.environment = null;
      environment?.dispose();
      // Halt GPU work and release the context synchronously when switching cards.
      renderer?.dispose();
      renderer?.forceContextLoss();
      root?.unmount();
      canvas.remove();
    }

    function fail() {
      if (stopped) return;
      dispose();
      onError();
    }

    function resize() {
      if (stopped || !store) return;
      const width = Math.max(host!.clientWidth, 1);
      const height = Math.max(host!.clientHeight, 1);
      store.getState().setSize(width, height);
      controller?.update();
    }

    async function start() {
      try {
        // Construct inside the effect so unsupported WebGL never throws during React render.
        renderer = new WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "low-power",
        });
        const loseContext = renderer.forceContextLoss.bind(renderer);
        const context = renderer.getContext();
        renderer.forceContextLoss = () => {
          if (!context.isContextLost()) loseContext();
        };
        renderer.setClearColor(0x000000, 0);
        renderer.outputColorSpace = SRGBColorSpace;
        renderer.toneMapping = ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1;
        canvas.addEventListener("webglcontextlost", fail);

        root = createRoot(canvas);
        await root.configure({
          gl: renderer,
          scene,
          camera,
          frameloop: "demand",
          dpr: Math.min(window.devicePixelRatio, 1.5),
          size: {
            width: Math.max(host!.clientWidth, 1),
            height: Math.max(host!.clientHeight, 1),
            top: 0,
            left: 0,
          },
        });
        if (stopped) return;
        const gltf = await loader.load(modelUrl, abort.signal);
        if (stopped) return;
        model = prepareModel(gltf);
        environment = lightScene(scene, renderer);
        store = root.render(<primitive object={model.group} dispose={null} />);
        controller = createViewerControls(
          camera,
          model.bounds,
          () => store?.getState().invalidate(),
        );
        controller.update();
        observer = new ResizeObserver(resize);
        observer.observe(host!);
        removeDrag = attachModelDrag(canvas, controller.rotateBy);
        // Publish controls only after a successful first frame, avoiding a blank ready state.
        renderer.render(scene, camera);
        onReady(controller.controls);
      } catch {
        fail();
      }
    }

    void start();
    return dispose;
  }, [modelUrl, label, onReady, onError]);

  return <div ref={hostRef} className="absolute inset-0" />;
}
