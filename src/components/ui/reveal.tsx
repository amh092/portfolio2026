"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { inView, stagger } from "motion";
import { animate } from "motion/mini";

// Prototype timelines, both triggered by the containing section's top.
const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;
const PRESETS = {
  block: { trigger: 0.78, distance: 30, duration: 0.8, stagger: 0.1 },
  grid: { trigger: 0.72, distance: 34, duration: 0.75, stagger: 0.07 },
} as const;
const SWEEP_MS = 4000;

type RevealProps = {
  children: ReactNode;
  /** Stagger slot within the section's reveal group (delay = index × 0.1s) */
  index?: number;
  /** Grid mode animates existing direct children in DOM/reading order. */
  variant?: keyof typeof PRESETS;
  className?: string;
};

// Progressive enhancement; server-rendered children retain their markup.
// SSR is never hidden: only sections below their trigger line are armed,
// so hash landings, locale switches, and no-JS/reduced-motion visitors
// always see content instantly. Reveals run once and never re-hide; the
// prototype's 4s sweep rescues anything hidden inside the viewport in
// case a trigger never fires.
export default function Reveal({
  children,
  index = 0,
  variant = "block",
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const reduceMq = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) return;

    const preset = PRESETS[variant];
    const targets =
      variant === "grid"
        ? Array.from(el.children).filter(
            (child): child is HTMLElement => child instanceof HTMLElement,
          )
        : [el];
    if (!targets.length) return;

    const show = () => {
      targets.forEach((target) => {
        target.style.opacity = "";
        target.style.transform = "";
      });
    };

    // The prototype triggers on the section, not the element — deep
    // blocks (contact form) animate with their section's head group.
    const section = el.closest("section") ?? el;
    if (section.getBoundingClientRect().top < innerHeight * preset.trigger) {
      return; // already at/above the trigger line → static, no animation
    }

    // Landing on /{locale}#section: html's scroll-behavior:smooth makes
    // the browser animate the initial fragment scroll, and it can still
    // be travelling (or not have started) when this effect measures — so
    // the live position can't be trusted. Everything at or above the
    // landing section must show instantly; sections above the final
    // viewport would otherwise never intersect and stay hidden.
    const hashTarget = location.hash
      ? document.getElementById(decodeURIComponent(location.hash.slice(1)))
      : null;
    if (hashTarget) {
      const landing = hashTarget.closest("section") ?? hashTarget;
      const precedesLanding =
        section === landing ||
        !!(
          section.compareDocumentPosition(landing) &
          Node.DOCUMENT_POSITION_FOLLOWING
        );
      if (precedesLanding) return;
    }

    targets.forEach((target) => {
      target.style.opacity = "0";
      target.style.transform = `translateY(${preset.distance}px)`;
    });

    let revealed = false;
    let animation: ReturnType<typeof animate> | undefined;
    let stop = () => {};

    const finish = () => {
      revealed = true;
      stop();
      animation?.cancel();
      show();
    };

    const observe = () => {
      stop();
      if (revealed) return;
      // IntersectionObserver percentages resolve against viewport WIDTH.
      // Pixels keep the 78%/72% height-based triggers exact at every size.
      stop = inView(
        section,
        () => {
          if (revealed) return;
          revealed = true;
          stop();
          animation = animate(
            targets,
            { opacity: 1, transform: "translateY(0px)" },
            {
              duration: preset.duration,
              delay:
                variant === "grid"
                  ? stagger(preset.stagger)
                  : index * preset.stagger,
              ease: EASE_OUT_QUART,
            },
          );
          animation.finished.then(show);
        },
        { margin: `0px 0px ${innerHeight * (preset.trigger - 1)}px 0px` },
      );
    };
    observe();
    window.addEventListener("resize", observe);

    const sweep = window.setTimeout(() => {
      if (
        !revealed &&
        targets.some((target) => target.getBoundingClientRect().top < innerHeight)
      ) {
        finish();
      }
    }, SWEEP_MS);

    const onReduceChange = () => {
      if (reduceMq.matches) {
        finish();
      }
    };
    reduceMq.addEventListener("change", onReduceChange);

    return () => {
      finish();
      clearTimeout(sweep);
      window.removeEventListener("resize", observe);
      reduceMq.removeEventListener("change", onReduceChange);
    };
  }, [index, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
