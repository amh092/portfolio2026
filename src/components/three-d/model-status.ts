import type { ViewerControls } from "./model-controls";

export type ModelLoadProgress =
  | { stage: "downloading"; loaded: number; total?: number }
  | { stage: "preparing" };

export type ModelViewerError = "download" | "webgl" | "contextLost" | "renderer" | "module";

export interface ModelRendererProps {
  modelUrl: string;
  label: string;
  onReady: (controls: ViewerControls) => void;
  onProgress: (progress: ModelLoadProgress) => void;
  onError: (error: ModelViewerError) => void;
}
