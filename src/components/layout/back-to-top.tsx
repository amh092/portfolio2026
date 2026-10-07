"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

interface BackToTopProps {
  menuOpen: boolean;
}

const BUTTON_CLASSES =
  "to-top fixed bottom-6 end-6 z-[80] grid size-11 cursor-pointer place-items-center rounded-full border border-border-strong bg-bg/80 text-fg-muted backdrop-blur-[10px] transition-[opacity,translate,color,border-color,box-shadow] duration-[350ms] ease-smooth hover:border-accent/50 hover:text-accent-text hover:shadow-[0_0_18px_-4px_rgb(var(--accent)/calc(var(--glow-a)/0.45))]";

export default function BackToTop({ menuOpen }: BackToTopProps) {
  const t = useTranslations("Footer");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let aboveThreshold = false;
    const sync = () => {
      const next = window.scrollY > window.innerHeight;
      // Only crossing the threshold schedules a React update.
      if (next !== aboveThreshold) {
        aboveThreshold = next;
        setScrolled(next);
      }
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  const visible = scrolled && !menuOpen;
  const returnToTop = () => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    // This control hides during the scroll; keep focus at a useful top target.
    document
      .querySelector<HTMLAnchorElement>('header a[href="#home"]')
      ?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      aria-label={t("backToTop")}
      aria-hidden={!visible}
      disabled={!visible}
      tabIndex={visible ? 0 : -1}
      onClick={returnToTop}
      className={`${BUTTON_CLASSES} ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none opacity-0 motion-safe:translate-y-3"
      }`}
    >
      <ArrowUp aria-hidden className="size-[18px]" />
    </button>
  );
}
