import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real hero content (phase-1-plan §5) lands in Step 2.
export default async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section
      id="home"
      aria-labelledby="home-heading"
      className="section-pad pt-[calc(var(--nav-h)+var(--section-pad))]"
    >
      <div className="container-page">
        <SectionHeading as="h1" headingId="home-heading" title={t("title")} />
        <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
