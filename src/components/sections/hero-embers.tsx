"use client";

import { useEffect, useRef } from "react";

// Ambient ember field + entrance finale burst + CTA spark flare — Phase 5
// Step 2R (liveliness proposal Option A, effects 4–6). Purely decorative and
// additive over the server-rendered hero: aria-hidden, pointer-events-none,
// nothing else depends on it. Never runs under prefers-reduced-motion; pauses
// while the hero is offscreen or the tab is hidden; DPR capped at 2; particle
// count halved on small screens. data-live / data-burst / data-sparks are
// state-change-only markers for the browser checks (no per-frame writes).

type Ember = {
  x: number;
  y: number;
  r: number;
  vy: number;
  swayAmp: number;
  swayFreq: number;
  twinkleFreq: number;
  phase: number;
  alpha: number;
  color: string;
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  life: number;
  age: number;
  color: string;
};

const DPR_CAP = 2;
const EMBER_ALPHA_MAX = 0.55;
const BURST_DELAY_MS = 150;
const SPARK_THROTTLE_MS = 400;

export default function HeroEmbers() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMq = matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let accent = "59 130 246";
    let accent2 = "99 102 241";
    let glowScale = 1; // --glow-a normalized to the dark theme's 0.45
    const embers: Ember[] = [];
    let sparks: Spark[] = [];
    let rafId = 0;
    let lastT = 0;
    let inView = true;
    let lastSparkAt = 0;
    let burstTimer = 0;

    const readTokens = () => {
      const style = getComputedStyle(document.documentElement);
      accent = style.getPropertyValue("--accent").trim() || accent;
      accent2 = style.getPropertyValue("--accent-2").trim() || accent2;
      glowScale = (parseFloat(style.getPropertyValue("--glow-a")) || 0.45) / 0.45;
    };

    const seedEmber = (spawnAnywhere: boolean): Ember => ({
      x: Math.random() * width,
      y: spawnAnywhere ? Math.random() * height : height + 10,
      r: 0.6 + Math.random() * 1.2,
      vy: 6 + Math.random() * 14,
      swayAmp: 6 + Math.random() * 12,
      swayFreq: 0.1 + Math.random() * 0.2,
      twinkleFreq: 0.2 + Math.random() * 0.3,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.25 + Math.random() * 0.3,
      color: Math.random() < 0.7 ? accent : accent2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const dpr = Math.min(devicePixelRatio || 1, DPR_CAP);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const target = width < 768 ? 14 : 30;
      while (embers.length < target) embers.push(seedEmber(true));
      embers.length = Math.min(embers.length, target);
    };

    const running = () =>
      inView && !document.hidden && !reduceMq.matches && width > 0;

    const draw = (t: number) => {
      rafId = 0;
      if (!running()) return stop();
      const dt = Math.min((t - lastT) / 1000, 0.05);
      lastT = t;
      const seconds = t / 1000;

      ctx.clearRect(0, 0, width, height);

      for (const e of embers) {
        e.y -= e.vy * dt;
        if (e.y < -12) {
          Object.assign(e, seedEmber(false));
        }
        const x = e.x + Math.sin(seconds * e.swayFreq * Math.PI * 2 + e.phase) * e.swayAmp;
        const twinkle = 0.5 + 0.5 * Math.sin(seconds * e.twinkleFreq * Math.PI * 2 + e.phase);
        const alpha = Math.min(e.alpha * twinkle * glowScale, EMBER_ALPHA_MAX);
        ctx.fillStyle = `rgb(${e.color} / ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, e.y, e.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgb(${e.color} / ${(alpha * 0.35).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(x, e.y, e.r * 2.6, 0, Math.PI * 2);
        ctx.fill();
      }

      sparks = sparks.filter((s) => s.age < s.life);
      for (const s of sparks) {
        s.age += dt;
        s.vy += 90 * dt;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        const fade = 1 - s.age / s.life;
        ctx.fillStyle = `rgb(${s.color} / ${(0.9 * fade * glowScale).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const start = () => {
      if (rafId || !running()) return;
      canvas.dataset.live = "1";
      lastT = performance.now();
      rafId = requestAnimationFrame(draw);
    };

    const stop = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      canvas.dataset.live = "0";
      if (reduceMq.matches) {
        sparks = [];
        ctx.clearRect(0, 0, width, height);
      }
    };

    const spawnSparks = (cx: number, cy: number, count: number, spread: number, speed: number) => {
      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * spread;
        const v = speed * (0.5 + Math.random());
        sparks.push({
          x: cx + (Math.random() - 0.5) * 24,
          y: cy,
          vx: Math.cos(angle) * v,
          vy: Math.sin(angle) * v,
          r: 0.8 + Math.random() * 1.2,
          life: 0.5 + Math.random() * 0.4,
          age: 0,
          color: Math.random() < 0.7 ? accent : accent2,
        });
      }
      start();
    };

    // Entrance finale burst (effect 5): fires once, right after the last
    // hero block's entrance ends. If the entrance already finished before
    // hydration (slow device) or never ran (later session load, reduced
    // motion), the gate class is absent and the burst gracefully skips.
    const blocks = document.querySelectorAll("#home .hero-enter");
    const lastBlock = blocks[blocks.length - 1];
    const onEntranceEnd = (e: AnimationEvent) => {
      if (e.animationName !== "hero-enter" || e.target !== lastBlock) return;
      document.removeEventListener("animationend", onEntranceEnd);
      burstTimer = window.setTimeout(() => {
        const heading = document.getElementById("home-heading");
        if (!heading || reduceMq.matches) return;
        const h = heading.getBoundingClientRect();
        const c = canvas.getBoundingClientRect();
        const cx = h.left - c.left + h.width / 2;
        const cy = h.top - c.top + h.height / 2;
        for (let i = 0; i < 13; i++) {
          const angle = Math.random() * Math.PI * 2;
          const v = 60 + Math.random() * 100;
          sparks.push({
            x: cx,
            y: cy,
            vx: Math.cos(angle) * v,
            vy: Math.sin(angle) * v,
            r: 1 + Math.random(),
            life: 0.7 + Math.random() * 0.3,
            age: 0,
            color: Math.random() < 0.7 ? accent : accent2,
          });
        }
        canvas.dataset.burst = "done";
        start();
      }, BURST_DELAY_MS);
    };
    if (document.documentElement.classList.contains("hero-entrance")) {
      document.addEventListener("animationend", onEntranceEnd);
    }

    // CTA spark flare (effect 6): transient interaction feedback on the
    // primary CTA, same §15.5 reading as the Step 5 hover shadows.
    const cta = document.querySelector<HTMLAnchorElement>('#home a[href="#projects"]');
    const onCtaSpark = () => {
      if (!cta || reduceMq.matches || performance.now() - lastSparkAt < SPARK_THROTTLE_MS)
        return;
      lastSparkAt = performance.now();
      const b = cta.getBoundingClientRect();
      const c = canvas.getBoundingClientRect();
      spawnSparks(b.left - c.left + b.width / 2, b.top - c.top, 5, 1.6, 70);
      canvas.dataset.sparks = String(Number(canvas.dataset.sparks || 0) + 1);
    };
    cta?.addEventListener("pointerenter", onCtaSpark);
    cta?.addEventListener("click", onCtaSpark);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
    });
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      resize();
      start();
    });
    ro.observe(canvas);
    const themeMo = new MutationObserver(readTokens);
    themeMo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    const onReduceChange = () => (reduceMq.matches ? stop() : start());
    reduceMq.addEventListener("change", onReduceChange);

    readTokens();
    resize();
    start();

    return () => {
      stop();
      clearTimeout(burstTimer);
      io.disconnect();
      ro.disconnect();
      themeMo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("animationend", onEntranceEnd);
      reduceMq.removeEventListener("change", onReduceChange);
      cta?.removeEventListener("pointerenter", onCtaSpark);
      cta?.removeEventListener("click", onCtaSpark);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      data-live="0"
      // size-full is required: a canvas is a replaced element, so inset-0
      // alone leaves it at its intrinsic 300×150 instead of stretching.
      className="pointer-events-none absolute inset-0 -z-1 size-full"
    />
  );
}
