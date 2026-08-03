import {
  Gauge,
  Layers,
  type LucideIcon,
  Monitor,
  RefreshCw,
  Rocket,
  Rotate3d,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import {
  CARD_FEATURED_SURFACE_CLASSES,
  CARD_GRID_CLASSES,
  CARD_ICON_CLASSES,
  CARD_SURFACE_CLASSES,
} from "@/components/ui/card";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { SERVICES } from "@/data/services";
import type { AppLocale } from "@/types/locale";
import type { ServiceIcon } from "@/types/service";

const SERVICE_ICONS: Record<ServiceIcon, LucideIcon> = {
  monitor: Monitor,
  layers: Layers,
  "rotate-3d": Rotate3d,
  rocket: Rocket,
  "refresh-cw": RefreshCw,
  gauge: Gauge,
};

export default async function ServicesSection() {
  // The [locale] layout 404s unknown locales, so this cast is safe.
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Services");

  return (
    <Section id="services" ariaLabelledby="services-heading">
      <SectionHeading
        center
        headingId="services-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <div className={CARD_GRID_CLASSES}>
        {SERVICES.map((service) => {
          const Icon = SERVICE_ICONS[service.icon];
          return (
            <div
              key={service.id}
              className={
                service.featured
                  ? CARD_FEATURED_SURFACE_CLASSES
                  : CARD_SURFACE_CLASSES
              }
            >
              <div className={CARD_ICON_CLASSES}>
                <Icon aria-hidden />
              </div>
              <h3 className="mb-[0.55rem] text-step-1">
                {service.title[locale]}
              </h3>
              {service.featured && (
                <p className="sr-only">{t("primaryService")}</p>
              )}
              <p className="text-(length:--step--1) text-fg-muted">
                {service.description[locale]}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
