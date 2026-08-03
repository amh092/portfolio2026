import type { Service } from "@/types/service";

// The six approved launch services in display order (phase-1-plan §7.1).
// Copy is verbatim; the AR titles/descriptions are the two halves of the
// approved «العنوان — الوصف» lines. The three primary services are featured.
export const SERVICES: Service[] = [
  {
    id: "business-websites",
    title: {
      en: "Business Websites",
      ar: "مواقع الأعمال",
    },
    description: {
      en: "A professional website built around your goals, services, and customers — in Arabic, English, or both.",
      ar: "موقع احترافي يُبنى حول أهدافك وخدماتك وعملائك، بالعربية أو الإنجليزية أو بكلتيهما.",
    },
    icon: "monitor",
    featured: true,
  },
  {
    id: "web-applications",
    title: {
      en: "Web Applications",
      ar: "تطبيقات الويب",
    },
    description: {
      en: "Dashboards, portals, and business tools that turn day-to-day operations into smooth digital workflows.",
      ar: "لوحات تحكم وبوابات وأدوات عمل تحوّل عملياتك اليومية إلى أنظمة رقمية سلسة.",
    },
    icon: "layers",
    featured: true,
  },
  {
    id: "interactive-3d",
    title: {
      en: "Interactive 3D Experiences",
      ar: "تجارب ثلاثية الأبعاد تفاعلية",
    },
    description: {
      en: "Interactive 3D models and scenes that run in the browser and make your product or brand memorable.",
      ar: "نماذج ومشاهد ثلاثية الأبعاد تعمل داخل المتصفح وتجعل منتجك أو علامتك أصعب نسياناً.",
    },
    icon: "rotate-3d",
    featured: true,
  },
  {
    id: "landing-pages",
    title: {
      en: "Landing Pages",
      ar: "صفحات هبوط",
    },
    description: {
      en: "A focused page for one campaign, product, or service, built to move visitors toward a single clear action.",
      ar: "صفحة مركّزة لحملة أو منتج أو خدمة واحدة، تقود الزائر نحو إجراء واحد واضح.",
    },
    icon: "rocket",
  },
  {
    id: "website-redesign",
    title: {
      en: "Website Redesign",
      ar: "إعادة تصميم المواقع",
    },
    description: {
      en: "A modern rebuild of an outdated site's design, structure, and content flow.",
      ar: "إعادة بناء حديثة لتصميم موقعك القديم وبنيته وتسلسل محتواه.",
    },
    icon: "refresh-cw",
  },
  {
    id: "performance-optimization",
    title: {
      en: "Performance Optimization",
      ar: "تحسين الأداء",
    },
    description: {
      en: "Making existing websites faster, smoother, and more pleasant to use.",
      ar: "جعل المواقع القائمة أسرع وأكثر سلاسة وأمتع في الاستخدام.",
    },
    icon: "gauge",
  },
];
