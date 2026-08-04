import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/button";
import Eyebrow from "@/components/ui/eyebrow";
import { CONTAINER_CLASSES } from "@/components/ui/section";

// Prototype #home: full-viewport height, copy vertically centered.
// overflow-x clip (not hidden — hidden would force overflow-y to auto
// and let the hero scroll internally): the title glow's negative inset
// otherwise widens the scrollable area past the viewport on small
// screens, and mobile browsers zoom the whole page out to fit it.
const HERO_CLASSES =
  "flex min-h-svh items-center overflow-x-clip pt-[calc(var(--nav-h)_+_clamp(3rem,8vw,6rem))] pb-[clamp(3rem,7vw,6rem)]";

// Prototype .hero-name scale; the static soft glow backdrop (before:) is
// allowed by phase-1-plan §15.5. rtl: = Arabic: Cairo glyphs run narrower
// than Inter's — a wider measure keeps the heading to two lines.
const HERO_TITLE_CLASSES =
  "relative mb-[1.3rem] max-w-[18ch] text-balance text-step-4 tracking-[-0.045em] before:pointer-events-none before:absolute before:inset-x-[-12%] before:inset-y-[-25%] before:-z-1 before:content-[''] before:bg-[radial-gradient(50%_60%_at_50%_50%,rgb(var(--accent)/calc(var(--glow-a)*0.28)),transparent_75%)] rtl:max-w-[24ch] rtl:tracking-normal";

// Prototype .grad; mirrored for RTL so the accent falls at the end of the
// reading direction in both locales. Raw gradients (not bg-linear-*):
// v4's gradient utilities interpolate in oklab, which shifts the colors.
const HERO_TITLE_GRAD_CLASSES =
  "bg-[linear-gradient(100deg,rgb(var(--fg))_20%,rgb(var(--accent))_55%,rgb(var(--accent-2))_85%)] bg-clip-text text-transparent rtl:bg-[linear-gradient(-100deg,rgb(var(--fg))_20%,rgb(var(--accent))_55%,rgb(var(--accent-2))_85%)]";

// Hero per phase-1-plan §5. No availability pill and no profile image —
// permanent Phase 1 omissions (§17). The prototype's stats row and 3D
// visual carry unapproved content and are not part of §5.
// hero-enter (+ --hero-enter-i stagger index) drives the session-gated
// entrance — see globals.css HERO ENTRANCE and public/entrance-init.js;
// without the gate class these are inert and the markup stays visible.
export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section id="home" aria-labelledby="home-heading" className={HERO_CLASSES}>
      <div className={CONTAINER_CLASSES}>
        <Eyebrow className="hero-enter">{t("eyebrow")}</Eyebrow>
        <h1
          id="home-heading"
          className={`${HERO_TITLE_CLASSES} hero-enter [--hero-enter-i:1]`}
        >
          <span className={HERO_TITLE_GRAD_CLASSES}>{t("title")}</span>
        </h1>
        <p className="hero-enter mb-8 max-w-[56ch] text-step-1 text-fg-muted [--hero-enter-i:2]">
          {t("lead")}
        </p>
        <div className="hero-enter flex flex-wrap gap-[0.8rem] [--hero-enter-i:3]">
          <Button href="#projects">{t("ctaPrimary")}</Button>
          <Button href="#contact" variant="ghost">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
