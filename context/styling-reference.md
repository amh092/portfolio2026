# Styling Reference

**Source of truth for all visual styling: [`ahmed-portfolio-prototype.html`](../ahmed-portfolio-prototype.html)** (repo root).

When implementing any section or component in Next.js, match the prototype's look. Compare the implemented result in the browser against the baseline screenshots below before considering a feature done.

## Baseline Screenshots

Captured 2026-08-01 from the prototype (all `.reveal` elements forced visible):

| File | State | Viewport |
| --- | --- | --- |
| `reference/prototype-hero-dark-en.png` | Hero only, dark, EN | 1440×900 |
| `reference/prototype-desktop-dark-en.png` | Full page, dark, EN | 1440 wide |
| `reference/prototype-desktop-light-en.png` | Full page, light, EN | 1440 wide |
| `reference/prototype-desktop-dark-ar.png` | Full page, dark, AR (RTL) | 1440 wide |
| `reference/prototype-mobile-dark-en.png` | Full page, dark, EN | 390×844 |

Regenerate with: `npm i --no-save puppeteer-core && node context/reference/take-screenshots.js` (uses installed Google Chrome; no browser download).

## Key Design Tokens (from the prototype)

- **Accent**: electric blue `#3b82f6` (`--accent: 59 130 246`); secondary indigo `#6366f1` (`--accent-2: 99 102 241`). Alpha applied via `rgb(var(--accent)/.x)`.
- **Dark theme (default)**: bg `rgb(9 11 16)`, bg-2 `rgb(14 17 24)`, fg `rgb(236 240 248)`, muted `rgb(160 170 190)`, borders `white/9%` (strong `16%`).
- **Light theme**: bg `rgb(248 250 253)`, fg `rgb(16 20 28)`; glow intensity drops via `--glow-a` (.45 dark → .22 light).
- **Fonts**: Inter (EN) / Cairo (AR), switched by `html[lang]`. AR gets `line-height: 1.9`, no letter-spacing, no uppercase.
- **Type scale**: fluid `clamp()` steps `--step--1` … `--step-4`; headings `letter-spacing: -.02em` (EN only).
- **Radii**: 10 / 16 / 24 / 32px (`--radius-sm/-/lg/xl`); pill buttons `999px`.
- **Layout**: container `1200px`, nav height `72px`, section padding `clamp(4.5rem, 9vw, 8rem)`.
- **Motion**: ease `cubic-bezier(.22,1,.36,1)`; reveals = fade + `translateY(24-34px)`, staggered ~0.07-0.1s; full reduced-motion support.

## Signature Visual Elements

- Fixed background atmosphere: radial accent glows + 64px grid (radial-masked) + two blurred orbs.
- Navbar: transparent → blurred glass (`blur(18px) saturate(160%)`) on scroll; active link marked by a small pulsing neon dot.
- Primary buttons: accent→indigo gradient pill with `neon-pulse` glow animation.
- Cards: `surface` bg + thin border, hover = lift `-5px` + accent border + pointer-follow radial glow (`--mx`/`--my`).
- Eyebrow badges: uppercase (EN), accent tint pill with glowing dot prefix.
- 3D viewers: dark area with inset neon edge (`viewer-edge`), lazy "Load 3D model" button, spinner ring loader, hint + tools overlays.
- Status pills: green completed / amber in-progress; green pulsing availability dot in hero.

## Notes for the Next.js Implementation

- Map these tokens into Tailwind v4 `@theme` in `src/app/globals.css` (no `tailwind.config.ts` — see coding-standards.md).
- The prototype uses GSAP; the real build uses Motion for React + CSS per the tech stack in project-overview.md. Match the *result* (timing, stagger, distance), not the library.
- Prototype copy is Lorem placeholder — content comes from `messages/*.json` and `src/data/*.ts`.
