import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the section body stays a clean placeholder until the
// 3D viewer arrives in Phase 6.
export default async function ThreeDSection() {
  const t = await getTranslations("ThreeD");

  return (
    <Section id="three-d" ariaLabelledby="three-d-heading">
      <SectionHeading
        headingId="three-d-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
    </Section>
  );
}
