"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  Cuboid,
  RotateCcw,
  RotateCw,
  Rotate3d,
  ZoomIn,
  ZoomOut,
  X,
} from "lucide-react";
import { useShowcase } from "./showcase-provider";
import type { ViewerControls } from "./model-renderer";

interface ModelViewerProps {
  slug: string;
  modelUrl: string;
  title: string;
  children: ReactNode;
}

interface ActiveViewerProps extends ModelViewerProps {
  onClose: () => void;
}

interface ImportFailureProps {
  onError: () => void;
}

interface PreviewFrameProps {
  children: ReactNode;
}

function ImportFailure({ onError }: ImportFailureProps) {
  useEffect(onError, [onError]);
  return null;
}

// This component is only mounted following the visitor's load action. The
// renderer, Fiber, Three and Meshopt decoder stay out of the initial request.
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

function ActiveViewer({
  slug,
  modelUrl,
  title,
  children,
  onClose,
}: ActiveViewerProps) {
  const t = useTranslations("ThreeD");
  const [controls, setControls] = useState<ViewerControls | null>(null);
  const [failed, setFailed] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
  }, []);
  const onError = useCallback(() => {
    setControls(null);
    setFailed(true);
  }, []);
  const ready = controls !== null && !failed;
  const status = failed ? t("unavailable") : ready ? t("hint") : t("loading");
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
        {!failed && (
          <div
            aria-hidden={!ready || undefined}
            className={`absolute inset-0 ${ready ? "bg-[radial-gradient(ellipse_at_50%_40%,#192a47,#111b2e_55%,#0e1118)]" : "opacity-0"}`}
          >
            <ModelRenderer
              modelUrl={modelUrl}
              label={t("viewerLabel", { model: title })}
              onReady={setControls}
              onError={onError}
            />
          </div>
        )}
      </PreviewFrame>
      <div className="p-3">
        <div
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
        <p
          id={`${slug}-viewer-status`}
          role="status"
          className="mt-2 text-center text-(length:--step--1) text-fg-muted"
        >
          {status}
        </p>
      </div>
    </>
  );
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
