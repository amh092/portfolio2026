"use client";

import dynamic from "next/dynamic";
import { useFormatter, useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Cuboid,
  RotateCcw,
  RotateCw,
  Rotate3d,
  ZoomIn,
  ZoomOut,
  X,
  RefreshCw,
} from "lucide-react";
import { useShowcase } from "./showcase-provider";
import type { ViewerControls } from "./model-controls";
import type { ModelLoadProgress, ModelRendererProps, ModelViewerError } from "./model-status";

interface ModelViewerProps {
  slug: string;
  modelUrl: string;
  title: string;
  children: ReactNode;
}

interface ActiveViewerProps extends ModelViewerProps {
  onClose: () => void;
}

interface ViewerAttemptProps extends ActiveViewerProps {
  onRetry: () => void;
}

interface PreviewFrameProps {
  children: ReactNode;
}

function ImportFailure({ onError }: ModelRendererProps) {
  useEffect(() => {
    onError("module");
  }, [onError]);
  return null;
}

// Mounted only after explicit activation. A failed chunk requires a page reload:
// the bundler caches its rejected import even when the viewer is remounted.
const ModelRenderer = dynamic(
  () => import("./model-renderer").catch(() => ({ default: ImportFailure })),
  { ssr: false },
);

const CONTROL_CLASSES =
  "grid size-11 flex-none cursor-pointer place-items-center rounded-sm border border-border bg-surface text-fg transition-colors hover:border-accent/50 hover:bg-surface-2 disabled:cursor-default disabled:opacity-40 [&_svg]:size-[18px]";

function PreviewFrame({ children }: PreviewFrameProps) {
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-md border border-border bg-bg-2">
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-viewer-edge"
      />
    </div>
  );
}

function ViewerAttempt({
  slug,
  modelUrl,
  title,
  children,
  onClose,
  onRetry,
}: ViewerAttemptProps) {
  const t = useTranslations("ThreeD");
  const format = useFormatter();
  const [controls, setControls] = useState<ViewerControls | null>(null);
  const [error, setError] = useState<ModelViewerError | null>(null);
  const [progress, setProgress] = useState<ModelLoadProgress | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const retryRef = useRef<HTMLButtonElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const recoverFocus = useRef(false);
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);
  const onError = useCallback((reason: ModelViewerError) => {
    recoverFocus.current = controlsRef.current?.contains(document.activeElement) ?? false;
    setControls(null);
    setError(reason);
  }, []);
  useEffect(() => {
    if (error && recoverFocus.current) retryRef.current?.focus({ preventScroll: true });
  }, [error]);
  const ready = controls !== null && error === null;
  const downloading = !ready && !error && progress?.stage === "downloading";
  const percent = downloading && progress.total
    ? Math.min(100, Math.floor(progress.loaded / progress.total * 100))
    : undefined;
  const errorKeys = {
    download: "downloadError",
    webgl: "webglUnavailable",
    contextLost: "contextLost",
    renderer: "unavailable",
    module: "viewerLoadError",
  } as const;
  let status = t("loading");
  if (error) status = t(errorKeys[error]);
  else if (ready) status = t("hint");
  else if (progress?.stage === "preparing") status = t("preparing");
  else if (downloading) {
    status = percent !== undefined
      ? t("downloadProgress", { progress: format.number(percent / 100, { style: "percent" }) })
      : t("downloadBytes", { size: format.number(progress.loaded / 1024, { maximumFractionDigits: 0 }) });
  }
  const actions = [
    { key: "rotateLeft", icon: RotateCcw, run: () => controls?.rotate(-1) },
    { key: "rotateRight", icon: RotateCw, run: () => controls?.rotate(1) },
    { key: "zoomIn", icon: ZoomIn, run: () => controls?.zoom(1) },
    { key: "zoomOut", icon: ZoomOut, run: () => controls?.zoom(-1) },
    { key: "reset", icon: Rotate3d, run: () => controls?.reset() },
  ] as const;

  return (
    <>
      <PreviewFrame>
        <div
          className={ready ? "opacity-0" : undefined}
          aria-hidden={ready || undefined}
        >
          {children}
        </div>
        {!error && (
          <div
            aria-hidden={!ready || undefined}
            className={`absolute inset-0 ${ready ? "bg-[radial-gradient(ellipse_at_50%_40%,#192a47,#111b2e_55%,#0e1118)]" : "opacity-0"}`}
          >
            <ModelRenderer
              modelUrl={modelUrl}
              label={t("viewerLabel", { model: title })}
              onReady={setControls}
              onError={onError}
              onProgress={setProgress}
            />
          </div>
        )}
      </PreviewFrame>
      <div className="p-3">
        <div
          ref={controlsRef}
          role="group"
          aria-label={t("viewerLabel", { model: title })}
          aria-describedby={`${slug}-viewer-status`}
          className="flex flex-wrap justify-center gap-1"
          dir="ltr"
        >
          <button
            ref={closeRef}
            type="button"
            className={CONTROL_CLASSES}
            title={t("returnToPreview")}
            aria-label={t("returnToPreviewAria", { model: title })}
            onClick={onClose}
          >
            <X aria-hidden />
          </button>
          {actions.map(({ key, icon: Icon, run }) => (
            <button
              key={key}
              type="button"
              className={CONTROL_CLASSES}
              title={t(key)}
              aria-label={t(key)}
              disabled={!ready}
              onClick={run}
            >
              <Icon aria-hidden />
            </button>
          ))}
        </div>
        {error && (
          <button
            id={`${slug}-retry`}
            ref={retryRef}
            type="button"
            onClick={error === "module" ? () => window.location.reload() : onRetry}
            aria-label={error === "module" ? t("reload") : t("retryAria", { model: title })}
            className="mt-3 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-accent/35 bg-surface px-3 font-semibold text-fg transition-colors hover:border-accent/60 hover:bg-surface-2"
          >
            <RefreshCw aria-hidden className="size-[18px]" />
            {error === "module" ? t("reload") : t("retry")}
          </button>
        )}
        <p
          id={`${slug}-viewer-status`}
          role="status"
          aria-atomic="true"
          className="mt-2 text-center text-(length:--step--1) text-fg-muted"
        >
          {status}
        </p>
        {percent !== undefined && (
          <progress
            value={percent}
            max={100}
            aria-label={t("downloadLabel")}
            className="mt-2 block h-1.5 w-full overflow-hidden rounded-full border-0 bg-surface-2 accent-accent [&::-moz-progress-bar]:bg-accent [&::-webkit-progress-bar]:bg-surface-2 [&::-webkit-progress-value]:bg-accent"
          />
        )}
      </div>
    </>
  );
}

function ActiveViewer(props: ActiveViewerProps) {
  const [attempt, setAttempt] = useState(0);
  return <ViewerAttempt key={attempt} {...props} onRetry={() => setAttempt(attempt + 1)} />;
}

export default function ModelViewer(props: ModelViewerProps) {
  const { activeModel, selectModel, hydrated } = useShowcase();
  const t = useTranslations("ThreeD");
  const active = activeModel === props.slug;

  const close = () => {
    selectModel(null);
    // The load button returns with the static card in the same React commit.
    requestAnimationFrame(() => {
      document.getElementById(`${props.slug}-load`)?.focus({ preventScroll: true });
    });
  };

  if (active) return <ActiveViewer {...props} onClose={close} />;

  return (
    <>
      <PreviewFrame>{props.children}</PreviewFrame>
      {hydrated && (
        <div className="p-3">
          <button
            id={`${props.slug}-load`}
            type="button"
            className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-accent/35 bg-surface px-3 font-semibold text-fg transition-colors hover:border-accent/60 hover:bg-surface-2"
            aria-label={t("loadAria", { model: props.title })}
            onClick={() => selectModel(props.slug)}
          >
            <Cuboid aria-hidden className="size-[18px]" />
            {t("load")}
          </button>
        </div>
      )}
    </>
  );
}
