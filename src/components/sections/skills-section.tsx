import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real skills content (phase-1-plan §13) lands in Step 7B.
export default async function SkillsSection() {
  const t = await getTranslations("Skills");

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          center
          headingId="skills-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-center text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
