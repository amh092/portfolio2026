import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";

// About per phase-1-plan §12 — the approved minimal biography only. The
// prototype's portrait placeholder and bullet list are omitted: the profile
// photo is a resolved omission and the bullets' content was never approved.
export default async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <Section id="about" ariaLabelledby="about-heading">
      <SectionHeading
        tight
        headingId="about-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <p className="max-w-[65ch] text-fg-muted">{t("bio")}</p>
    </Section>
  );
}
