import { getLocale, getTranslations } from "next-intl/server";
import { SOCIAL_LINK_ICONS } from "@/components/ui/brand-icons";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { SOCIAL_LINKS } from "@/data/social-links";
import type { AppLocale } from "@/types/locale";

// Prototype method-row slide follows reading direction and respects reduced motion.
const METHOD_CLASSES =
  "flex items-center gap-[0.9rem] rounded-md border border-border bg-surface px-[1.1rem] py-[0.95rem] transition-[translate,border-color,background-color] duration-300 ease-smooth hover:border-accent/45 hover:bg-surface-2 motion-safe:ltr:hover:translate-x-[3px] motion-safe:rtl:hover:-translate-x-[3px]";
const METHOD_ICON_CLASSES =
  "grid size-[38px] flex-none place-items-center rounded-[11px] bg-accent/12 text-accent";

export default async function ContactSection() {
  // The [locale] layout 404s unknown locales, so this cast is safe.
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Contact");

  return (
    <Section id="contact" ariaLabelledby="contact-heading">
      <div className="grid items-start gap-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <SectionHeading
            tight
            headingId="contact-heading"
            eyebrow={t("eyebrow")}
            title={t("title")}
            sub={t("sub")}
          />
        </div>
        <Reveal index={1}>
          <ul className="grid gap-[0.7rem]">
            {SOCIAL_LINKS.map((link) => {
              const Icon = SOCIAL_LINK_ICONS[link.icon];
              return (
                <li key={link.id}>
                  <a href={link.href} className={METHOD_CLASSES}>
                    <span aria-hidden className={METHOD_ICON_CLASSES}>
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.9rem] font-semibold">
                        {link.label[locale]}
                      </span>
                      <small className="block text-[0.78rem] text-fg-dim [overflow-wrap:anywhere]">
                        {/* Addresses stay LTR inside the RTL layout */}
                        <bdi dir="ltr">{link.detail}</bdi>
                      </small>
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
