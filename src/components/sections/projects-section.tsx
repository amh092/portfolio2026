import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real projects content (phase-1-plan §8, §9) lands in Step 6.
export default async function ProjectsSection() {
  const t = await getTranslations("Projects");

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          headingId="projects-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
