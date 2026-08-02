import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real business-growth content (phase-1-plan §6) lands in Step 3.
export default async function BusinessGrowthSection() {
  const t = await getTranslations("BusinessGrowth");

  return (
    <section
      id="business-growth"
      aria-labelledby="business-growth-heading"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          center
          headingId="business-growth-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-center text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
