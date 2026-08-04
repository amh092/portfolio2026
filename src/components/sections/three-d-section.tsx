import { getTranslations } from "next-intl/server";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";

// The section body stays a clean placeholder (head only) until the
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
    </Section>
  );
}
