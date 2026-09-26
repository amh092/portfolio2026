"use client";

import { useEffect } from "react";

interface PointerSample {
  card: HTMLElement;
  x: number;
  y: number;
}

// One delegated listener for all server-rendered cards. Movement only writes
// CSS coordinates; no React state or per-card handlers are needed.
export default function CardPointerGlow() {
  useEffect(() => {
    const enabled = matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const touched = new Set<HTMLElement>();
    let pending: PointerSample | null = null;
    let frame = 0;

    const update = () => {
      frame = 0;
      if (!pending || !enabled.matches || !pending.card.isConnected) return;
      const { card, x, y } = pending;
      const rect = card.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      // Physical coordinates are correct in both LTR and RTL.
      const percent = (offset: number, size: number) =>
        `${Math.min(100, Math.max(0, (offset / size) * 100))}%`;
      card.style.setProperty("--mx", percent(x - rect.left, rect.width));
      card.style.setProperty("--my", percent(y - rect.top, rect.height));
      touched.add(card);
    };

    const onPointerMove = (event: PointerEvent) => {
      // A hybrid device may have a fine mouse and a touch screen.
      const card =
        event.pointerType !== "touch" && event.target instanceof Element
          ? event.target.closest<HTMLElement>(".pointer-glow")
          : null;
      pending = card ? { card, x: event.clientX, y: event.clientY } : null;
      if (pending && !frame) frame = requestAnimationFrame(update);
    };

    const reset = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      pending = null;
      touched.forEach((card) => {
        card.style.removeProperty("--mx");
        card.style.removeProperty("--my");
      });
      touched.clear();
    };

    const sync = () => {
      document.removeEventListener("pointermove", onPointerMove);
      reset();
      if (enabled.matches) {
        document.addEventListener("pointermove", onPointerMove, { passive: true });
      }
    };

    sync();
    enabled.addEventListener("change", sync);
    return () => {
      enabled.removeEventListener("change", sync);
      document.removeEventListener("pointermove", onPointerMove);
      reset();
    };
  }, []);

  return null;
}
