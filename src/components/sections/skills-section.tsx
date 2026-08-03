import {
  Code,
  Cuboid,
  Languages,
  type LucideIcon,
  Server,
  Wrench,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import {
  CARD_GRID_WIDE_CLASSES,
  CARD_SURFACE_CLASSES,
} from "@/components/ui/card";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import { SKILL_CATEGORIES } from "@/data/skills";
import type { AppLocale } from "@/types/locale";
import type { SkillCategoryIcon } from "@/types/skill";

const CATEGORY_ICONS: Record<SkillCategoryIcon, LucideIcon> = {
  code: Code,
  server: Server,
  cuboid: Cuboid,
  languages: Languages,
  wrench: Wrench,
};

// Prototype .skill-tag (hover lift + neon shadow are Phase 5; color transition only).
const SKILL_TAG_CLASSES =
  "rounded-[10px] border border-border bg-surface px-[0.8rem] py-[0.4rem] text-[0.8rem] font-medium text-fg-muted transition-[color,border-color,background-color] duration-300 ease-smooth hover:border-accent/50 hover:bg-accent/8 hover:text-fg";

export default async function SkillsSection() {
  // The [locale] layout 404s unknown locales, so this cast is safe.
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Skills");

  return (
    <Section id="skills" ariaLabelledby="skills-heading">
      <SectionHeading
        center
        headingId="skills-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
        sub={t("sub")}
      />
      <div className={CARD_GRID_WIDE_CLASSES}>
        {SKILL_CATEGORIES.map((category) => {
          const Icon = CATEGORY_ICONS[category.icon];
          return (
            <div key={category.id} className={CARD_SURFACE_CLASSES}>
              <h3 className="mb-4 flex items-center gap-[0.6rem] text-step-0">
                <Icon aria-hidden className="size-[17px] text-accent" />
                {category.label[locale]}
              </h3>
              <ul className="flex flex-wrap gap-[0.45rem]">
                {category.skills.map((skill) => (
                  <li key={skill} className={SKILL_TAG_CLASSES}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
