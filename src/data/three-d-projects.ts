import type { ThreeDProject } from "@/types/three-d-project";

// Approved Phase 1 §§11/16 content. These assets were generated with Meshy AI;
// the showcased work is their interactive web integration.
export const THREE_D_PROJECTS: ThreeDProject[] = [
  {
    slug: "robot-primary",
    title: {
      en: "Primary-Stage Robot",
      ar: "روبوت المرحلة الابتدائية",
    },
    description: {
      en: "The primary-school competition robot from Insally — a rigged, animated character that evolves as its team earns INS levels; generated with Meshy AI and rendered in the browser with React Three Fiber.",
      ar: "روبوت المرحلة الابتدائية من إنسآلي — شخصية متحركة بهيكل حركي تتطور كلما كسب فريقها مستويات INS؛ أُنشئ بـ Meshy AI ويُعرض في المتصفح عبر React Three Fiber.",
    },
    modelUrl: "/models/robot-primary.glb",
    previewImage: "/images/three-d/robot-primary.webp",
    previewImageAlt: {
      en: "Primary-stage competition robot from Insally",
      ar: "روبوت إنسآلي للمرحلة الابتدائية",
    },
    tools: ["Meshy AI", "GLB/GLTF", "Three.js", "React Three Fiber"],
    interactive: true,
  },
  {
    slug: "robot-middle",
    title: {
      en: "Middle-Stage Robot",
      ar: "روبوت المرحلة المتوسطة",
    },
    description: {
      en: "The middle-school competition robot from Insally — an animated character with its own motion set, generated with Meshy AI and rendered in the browser with React Three Fiber.",
      ar: "روبوت المرحلة المتوسطة من إنسآلي — شخصية متحركة بمجموعة حركات خاصة بها، أُنشئت بـ Meshy AI وتُعرض في المتصفح عبر React Three Fiber.",
    },
    modelUrl: "/models/robot-middle.glb",
    previewImage: "/images/three-d/robot-middle.webp",
    previewImageAlt: {
      en: "Middle-stage competition robot from Insally",
      ar: "روبوت إنسآلي للمرحلة المتوسطة",
    },
    tools: ["Meshy AI", "GLB/GLTF", "Three.js", "React Three Fiber"],
    interactive: true,
  },
  {
    slug: "robot-highschool",
    title: {
      en: "High-School-Stage Robot",
      ar: "روبوت المرحلة الثانوية",
    },
    description: {
      en: "The high-school competition robot from Insally — the most advanced of the three stage robots, animated and rendered in the browser with React Three Fiber; generated with Meshy AI.",
      ar: "روبوت المرحلة الثانوية من إنسآلي — أكثر روبوتات المراحل الثلاث تقدماً، متحرك ويُعرض في المتصفح عبر React Three Fiber؛ أُنشئ بـ Meshy AI.",
    },
    modelUrl: "/models/robot-highschool.glb",
    previewImage: "/images/three-d/robot-highschool.webp",
    previewImageAlt: {
      en: "High-school-stage competition robot from Insally",
      ar: "روبوت إنسآلي للمرحلة الثانوية",
    },
    tools: ["Meshy AI", "GLB/GLTF", "Three.js", "React Three Fiber"],
    interactive: true,
  },
];
