import type { LocalizedText } from "@/types/locale";

/** Icon slugs for contact methods, mapped to components in the section. */
export type SocialLinkIcon = "mail" | "github" | "linkedin" | "whatsapp";

export type SocialLink = {
  /** Stable slug for the phase-1-plan §14.1 contact method */
  id: string;
  label: LocalizedText;
  /** Address line shown under the label (email, host path, phone number) */
  detail: string;
  href: string;
  icon: SocialLinkIcon;
};
