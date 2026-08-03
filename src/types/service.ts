import type { LocalizedText } from "@/types/locale";

/** Lucide icon slugs used on service cards, mapped to components in the section. */
export type ServiceIcon =
  | "monitor"
  | "layers"
  | "rotate-3d"
  | "rocket"
  | "refresh-cw"
  | "gauge";

export type Service = {
  /** Stable slug approved in phase-1-plan §7.1 */
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  icon: ServiceIcon;
  /** Primary launch service — gets the featured card treatment */
  featured?: boolean;
};
