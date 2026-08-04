import type { SocialLink } from "@/types/social-link";

// The four confirmed contact methods (phase-1-plan §14.1) in display order.
// GitHub/LinkedIn keep their product names in both locales; the WhatsApp
// AR label is the §14.1-approved واتساب. The footer (Step 9) reuses the
// email/github/linkedin entries.
export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "email",
    label: { en: "Email", ar: "البريد الإلكتروني" },
    detail: "lastamh@gmail.com",
    href: "mailto:lastamh@gmail.com",
    icon: "mail",
  },
  {
    id: "github",
    label: { en: "GitHub", ar: "GitHub" },
    detail: "github.com/amh092",
    href: "https://github.com/amh092",
    icon: "github",
  },
  {
    id: "linkedin",
    label: { en: "LinkedIn", ar: "LinkedIn" },
    detail: "linkedin.com/in/ahmed-mohammad-25aa08250",
    href: "https://www.linkedin.com/in/ahmed-mohammad-25aa08250/",
    icon: "linkedin",
  },
  {
    id: "whatsapp",
    label: { en: "WhatsApp", ar: "واتساب" },
    detail: "+966598143173",
    href: "https://wa.me/966598143173",
    icon: "whatsapp",
  },
];
