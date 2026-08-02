import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real services content (phase-1-plan §7) lands in Step 4.
export default async function ServicesSection() {
  const t = await getTranslations("Services");

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          center
          headingId="services-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-center text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
