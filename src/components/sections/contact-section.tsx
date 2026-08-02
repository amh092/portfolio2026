import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/section-heading";

// Scaffold — the real contact content (phase-1-plan §14.1) lands in Step 8.
export default async function ContactSection() {
  const t = await getTranslations("Contact");

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-pad"
    >
      <div className="container-page">
        <SectionHeading
          headingId="contact-heading"
          eyebrow={t("eyebrow")}
          title={t("title")}
        />
        <p className="mt-4 text-fg-muted">{t("title")} — Phase 4</p>
      </div>
    </section>
  );
}
