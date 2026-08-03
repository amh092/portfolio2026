import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real projects content (phase-1-plan §8, §9) lands in Step 6.
export default async function ProjectsSection() {
  const t = await getTranslations("Projects");

  return (
    <Section id="projects" ariaLabelledby="projects-heading">
      <SectionHeading
        headingId="projects-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
    </Section>
  );
}
