import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real about content (phase-1-plan §12) lands in Step 7A.
export default async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section id="about" aria-labelledby="about-heading" className="section-pad">
      <div className="container-page">
        <SectionHeading
          headingId="about-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
