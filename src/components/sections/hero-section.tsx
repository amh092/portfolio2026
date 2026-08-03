import { getTranslations } from "next-intl/server";
import Button from "@/components/ui/button";

// Hero per phase-1-plan §5. No availability pill and no profile image —
// permanent Phase 1 omissions (§17). The prototype's stats row and 3D
// visual carry unapproved content and are not part of §5; entrance
// animation is Phase 5.
export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section id="home" aria-labelledby="home-heading" className="hero">
      <div className="container-page">
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1 id="home-heading" className="hero-title">
          <span className="hero-title-grad">{t("title")}</span>
        </h1>
        <p className="hero-lead">{t("lead")}</p>
        <div className="hero-cta">
          <Button href="#projects">{t("ctaPrimary")}</Button>
          <Button href="#contact" variant="ghost">
            {t("ctaSecondary")}
          </Button>
        </div>
      </div>
    </section>
  );
}
