import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real skills content (phase-1-plan §13) lands in Step 7B.
export default async function SkillsSection() {
  const t = await getTranslations("Skills");

  return (
    <Section id="skills" ariaLabelledby="skills-heading">
      <SectionHeading
        center
        headingId="skills-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <p className="mt-4 text-center text-fg-muted">{t("title")} — Phase 4</p>
    </Section>
  );
}
