import { Box, Globe, Mail, TrendingUp, Zap } from "lucide-react";
import { getTranslations } from "next-intl/server";
import {
  CARD_GRID_CLASSES,
  CARD_ICON_CLASSES,
  CARD_SURFACE_CLASSES,
} from "@/components/ui/card";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";

// Benefits in the approved display order (phase-1-plan §6.2). Bilingual
// reach is intentionally not a card — excluded per §6.3.
const BENEFITS = [
  { key: "onlinePresence", Icon: Globe },
  { key: "userExperience", Icon: Zap },
  { key: "customerEnquiries", Icon: Mail },
  { key: "brandExperiences", Icon: Box },
  { key: "builtToGrow", Icon: TrendingUp },
] as const;

export default async function BusinessGrowthSection() {
  const t = await getTranslations("BusinessGrowth");

  return (
    <Section id="business-growth" ariaLabelledby="business-growth-heading">
      <SectionHeading
        center
        headingId="business-growth-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        sub={t("intro")}
      />
      <div className={CARD_GRID_CLASSES}>
        {BENEFITS.map(({ key, Icon }) => (
          <div key={key} className={CARD_SURFACE_CLASSES}>
            <div className={CARD_ICON_CLASSES}>
              <Icon aria-hidden />
            </div>
            <h3 className="mb-[0.55rem] text-step-1">
              {t(`benefits.${key}.title`)}
            </h3>
            <p className="text-(length:--step--1) text-fg-muted">
              {t(`benefits.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
