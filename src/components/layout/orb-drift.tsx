"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { scroll } from "motion";
import { animate } from "motion/mini";

interface OrbDriftProps {
  children: ReactNode;
  className: string;
}

const ORBS = [
  [".orb-1", "18%"],
  [".orb-2", "-14%"],
] as const;

// Server-rendered backdrop stays static until enhancement is enabled.
export default function OrbDrift({ children, className }: OrbDriftProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const backdrop = ref.current;
    if (!backdrop) return;
    const enabled = matchMedia("(prefers-reduced-motion: no-preference)");
    let cleanups: (() => void)[] = [];

    const reset = () => {
      cleanups.forEach((cleanup) => cleanup());
      cleanups = [];
    };

    const sync = () => {
      reset();
      if (!enabled.matches) return;

      ORBS.forEach(([selector, distance]) => {
        const orb = backdrop.querySelector<HTMLElement>(selector);
        if (!orb) return;
        const animation = animate(
          orb,
          { transform: ["translateY(0%)", `translateY(${distance})`] },
          { ease: "linear" },
        );
        // Full-page progress; native ScrollTimeline where supported.
        const stop = scroll(animation);
        cleanups.push(() => {
          stop();
          animation.cancel();
          // Motion's stop can persist the current frame as an inline style.
          orb.style.removeProperty("transform");
        });
      });
    };

    sync();
    enabled.addEventListener("change", sync);
    return () => {
      enabled.removeEventListener("change", sync);
      reset();
    };
  }, []);

  return (
    <div ref={ref} aria-hidden className={className}>
      {children}
    </div>
  );
}
