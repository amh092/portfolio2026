import { type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

// Approved section order and anchor IDs (context/phase-1-plan.md §2).
// Headings are placeholders — real section content lands in Phase 4.
const SECTIONS = [
  { id: "home", labelKey: "home" },
  { id: "business-growth", labelKey: "businessGrowth" },
  { id: "services", labelKey: "services" },
  { id: "projects", labelKey: "projects" },
  { id: "three-d", labelKey: "threeD" },
  { id: "about", labelKey: "about" },
  { id: "skills", labelKey: "skills" },
  { id: "contact", labelKey: "contact" },
] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("Navigation");

  return (
    <main>
      {SECTIONS.map(({ id, labelKey }) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className="section-pad border-b border-border"
        >
          <div className="container-page">
            {id === "home" ? (
              <h1 id={`${id}-heading`} className="text-step-4">
                {t(labelKey)}
              </h1>
            ) : (
              <h2 id={`${id}-heading`} className="text-step-3">
                {t(labelKey)}
              </h2>
            )}
            <p className="mt-4 text-fg-muted">{t(labelKey)} — Phase 4</p>
          </div>
        </section>
      ))}
    </main>
  );
}
