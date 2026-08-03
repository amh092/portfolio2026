import type { SkillCategory } from "@/types/skill";

// The five approved skill categories in display order (phase-1-plan §13).
// EN labels and skill lists are verbatim; the AR labels are the §13 note's
// equivalents — noted at planning time, pending formal approval in Step 7B.
export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "frontend",
    label: {
      en: "Frontend",
      ar: "الواجهات الأمامية",
    },
    icon: "code",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    id: "backend-databases",
    label: {
      en: "Backend & Databases",
      ar: "الخلفية وقواعد البيانات",
    },
    icon: "server",
    skills: ["Node.js", "NestJS", "REST APIs", "Prisma", "PostgreSQL", "Supabase"],
  },
  {
    id: "three-d-interactive",
    label: {
      en: "3D & Interactive",
      ar: "ثلاثي الأبعاد والتفاعل",
    },
    icon: "cuboid",
    skills: [
      "Three.js",
      "React Three Fiber",
      "Drei",
      "GLB/GLTF workflows",
      "Meshy AI",
    ],
  },
  {
    id: "internationalization",
    label: {
      en: "Internationalization",
      ar: "تعدد اللغات",
    },
    icon: "languages",
    skills: ["Arabic RTL & English LTR interfaces", "next-intl"],
  },
  {
    id: "tools-testing",
    label: {
      en: "Tools & Testing",
      ar: "الأدوات والاختبار",
    },
    icon: "wrench",
    skills: ["Git", "GitHub", "Vercel", "Zod", "Vitest", "Jest"],
  },
];
