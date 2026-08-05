"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { animate, inView } from "motion";

// Prototype section-reveal timeline: y 30px → 0, 0.8s, power3.out,
// 0.1s stagger per group slot, triggered when the *section* top crosses
// 78% of the viewport (GSAP `start: "top 78%"` ≙ inView margin -22%).
const EASE_OUT_QUART = [0.165, 0.84, 0.44, 1] as const;
const TRIGGER_VH = 0.78;
const TRIGGER_MARGIN = "0px 0px -22% 0px";
const DISTANCE_PX = 30;
const DURATION_S = 0.8;
const STAGGER_S = 0.1;
const SWEEP_MS = 4000;

type RevealProps = {
  children: ReactNode;
  /** Stagger slot within the section's reveal group (delay = index × 0.1s) */
  index?: number;
  className?: string;
};

// Scroll-reveal wrapper (Phase 5 Step 3) — progressive enhancement that
// keeps sections server components (children arrive server-rendered).
// The SSR markup is never hidden: this hides its box only when the whole
// box is still below the viewport at mount, so hash landings, the
// section-preserving language switch, and no-JS/reduced-motion visitors
// always see content instantly. Reveals run once and never re-hide; the
// prototype's 4s sweep rescues anything hidden inside the viewport in
// case a trigger never fires.
export default function Reveal({
  children,
  index = 0,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduceMq = matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) return;

    const show = () => {
      el.style.opacity = "";
      el.style.transform = "";
    };

    // The prototype triggers on the section, not the element — deep
    // blocks (contact form) animate with their section's head group.
    const section = el.closest("section") ?? el;
    if (section.getBoundingClientRect().top < innerHeight * TRIGGER_VH) {
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

    el.style.opacity = "0";
    el.style.transform = `translateY(${DISTANCE_PX}px)`;

    const stop = inView(
      section,
      () => {
        stop(); // once — never re-hide
        animate(
          el,
          { opacity: 1, transform: "translateY(0px)" },
          {
            duration: DURATION_S,
            delay: index * STAGGER_S,
            ease: EASE_OUT_QUART,
          },
        ).finished.then(show); // clearProps parity with the prototype
      },
      { margin: TRIGGER_MARGIN },
    );

    const sweep = window.setTimeout(() => {
      if (
        getComputedStyle(el).opacity === "0" &&
        el.getBoundingClientRect().top < innerHeight
      ) {
        show();
      }
    }, SWEEP_MS);

    const onReduceChange = () => {
      if (reduceMq.matches) {
        stop();
        show();
      }
    };
    reduceMq.addEventListener("change", onReduceChange);

    return () => {
      stop();
      clearTimeout(sweep);
      reduceMq.removeEventListener("change", onReduceChange);
      show();
    };
  }, [index]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
