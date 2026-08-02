// Approved section order and anchor IDs (context/phase-1-plan.md §2).
// Anchor IDs are identical across locales; labels come from the
// `Navigation` namespace in messages/*.json.
export const SECTIONS = [
  { id: "home", labelKey: "home" },
  { id: "business-growth", labelKey: "businessGrowth" },
  { id: "services", labelKey: "services" },
  { id: "projects", labelKey: "projects" },
  { id: "three-d", labelKey: "threeD" },
  { id: "about", labelKey: "about" },
  { id: "skills", labelKey: "skills" },
  { id: "contact", labelKey: "contact" },
] as const;

export type Section = (typeof SECTIONS)[number];
export type SectionId = Section["id"];
