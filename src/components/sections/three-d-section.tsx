import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the section body stays a clean placeholder until the
// 3D viewer arrives in Phase 6.
export default async function ThreeDSection() {
  const t = await getTranslations("ThreeD");

  return (
    <section
      id="three-d"
      aria-labelledby="three-d-heading"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          headingId="three-d-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
