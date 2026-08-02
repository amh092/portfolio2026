import { type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { SECTIONS } from "@/data/sections";

// Section headings are placeholders — real section content lands in Phase 4.
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  const t = await getTranslations("Navigation");

  return (
    <main id="main">
      {SECTIONS.map(({ id, labelKey }) => (
        <section
          key={id}
          id={id}
          aria-labelledby={`${id}-heading`}
          className={`section-pad border-b border-border ${
            id === "home" ? "pt-[calc(var(--nav-h)+var(--section-pad))]" : ""
          }`}
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
