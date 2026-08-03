import type { LocalizedText } from "@/types/locale";

/** Lucide icon slugs used on skill-category headings, mapped to components in the section. */
export type SkillCategoryIcon =
  | "code"
  | "server"
  | "cuboid"
  | "languages"
  | "wrench";

export type SkillCategory = {
  /** Stable slug for the phase-1-plan §13 category */
  id: string;
  label: LocalizedText;
  icon: SkillCategoryIcon;
  /** Skill names stay in English in both locales (technical product names). */
  skills: string[];
};
