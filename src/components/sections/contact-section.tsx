import { getLocale, getTranslations } from "next-intl/server";
import { SOCIAL_LINK_ICONS } from "@/components/ui/brand-icons";
import Button from "@/components/ui/button";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { SOCIAL_LINKS } from "@/data/social-links";
import type { AppLocale } from "@/types/locale";

// Prototype .method row (the translateX hover slide is Phase 5, like the
// card lifts; hover here is the plain color transition).
const METHOD_CLASSES =
  "flex items-center gap-[0.9rem] rounded-md border border-border bg-surface px-[1.1rem] py-[0.95rem] transition-[border-color,background-color] duration-300 ease-smooth hover:border-accent/45 hover:bg-surface-2";
const METHOD_ICON_CLASSES =
  "grid size-[38px] flex-none place-items-center rounded-[11px] bg-accent/12 text-accent";

const FIELD_CLASSES = "grid gap-[0.45rem]";
const LABEL_CLASSES = "text-[0.82rem] font-semibold text-fg-muted";
// Prototype input/textarea incl. the §15.2 focus ring (accent/60 border +
// 3px accent/14 shadow), which replaces the global :focus-visible outline.
const INPUT_CLASSES =
  "w-full rounded-[12px] border border-border bg-bg/50 px-4 py-[0.85rem] text-(length:--step--1) transition-[border-color,box-shadow] duration-250 ease-smooth focus:border-accent/60 focus:shadow-[0_0_0_3px_rgb(var(--accent)/0.14)] focus:outline-none";

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
          <ul className="mt-[1.8rem] grid gap-[0.7rem]">
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
        </div>
        {/* UI only until Phase 7: no action/handler, and the button is
            type="button" — a type="submit" with no action would still
            trigger the browser's default GET navigation. */}
        <form className="grid gap-4 rounded-lg border border-border bg-surface p-[clamp(1.4rem,3vw,2rem)]">
          <div className="grid grid-cols-2 gap-4 max-[560px]:grid-cols-1">
            <div className={FIELD_CLASSES}>
              <label htmlFor="contact-name" className={LABEL_CLASSES}>
                {t("form.name")}
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                className={INPUT_CLASSES}
              />
            </div>
            <div className={FIELD_CLASSES}>
              <label htmlFor="contact-email" className={LABEL_CLASSES}>
                {t("form.email")}
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className={INPUT_CLASSES}
              />
            </div>
          </div>
          <div className={FIELD_CLASSES}>
            <label htmlFor="contact-subject" className={LABEL_CLASSES}>
              {t("form.subject")}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              className={INPUT_CLASSES}
            />
          </div>
          <div className={FIELD_CLASSES}>
            <label htmlFor="contact-message" className={LABEL_CLASSES}>
              {t("form.message")}
            </label>
            <textarea
              id="contact-message"
              name="message"
              className={`${INPUT_CLASSES} min-h-[130px] resize-y`}
            />
          </div>
          <Button type="button" className="justify-self-start">
            {t("form.submit")}
          </Button>
        </form>
      </div>
    </Section>
  );
}
