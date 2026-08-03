import type { Project } from "@/types/project";

// The three approved projects in display order (phase-1-plan §8.2):
// Tavolla → RentFlow → Insally. All copy is verbatim from §9; alt text is
// from the §16 manifest. Cards link live demos only — no repository URLs.
export const PROJECTS: Project[] = [
  {
    slug: "tavolla",
    title: {
      en: "Tavolla",
      ar: "Tavolla",
    },
    summary: {
      en: "A complete restaurant booking and pickup-ordering platform — customers reserve tables and order online, while staff run reservations, tables, menu, and orders from a dedicated admin panel.",
      ar: "منصة متكاملة لحجز طاولات المطاعم وطلبات الاستلام — العملاء يحجزون ويطلبون عبر الموقع، والفريق يدير الحجوزات والطاولات والقائمة والطلبات من لوحة تحكم خاصة.",
    },
    problem: {
      en: "Restaurants often run bookings through phone calls, WhatsApp threads, and paper notebooks — tables get double-booked and staff time disappears into coordination.",
      ar: "كثير من المطاعم تدير حجوزاتها عبر المكالمات ورسائل واتساب والدفاتر الورقية، فتتكرر الحجوزات المزدوجة ويستهلك التنسيقُ وقتَ الفريق.",
    },
    solution: {
      en: "One centralized system: availability is computed live from real tables, opening hours, and existing bookings; customers book with confirmation codes and manage their own reservations; pickup orders flow through cart, checkout, and live status tracking; and staff handle everything from an admin panel with automatic email notifications.",
      ar: "نظام مركزي واحد: يُحسب التوافر مباشرة من الطاولات وساعات العمل والحجوزات القائمة، ويحجز العملاء برموز تأكيد ويديرون حجوزاتهم بأنفسهم، وتمر طلبات الاستلام بالسلة والدفع والمتابعة الحية، بينما يدير الفريق كل شيء من لوحة تحكم مع إشعارات بريدية تلقائية.",
    },
    image: "/images/projects/tavolla.webp",
    imageAlt: {
      en: "Tavolla — restaurant booking platform landing page",
      ar: "Tavolla — الصفحة الرئيسية لمنصة حجز المطاعم",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Resend",
    ],
    features: [
      {
        en: "Live availability that only offers time slots with a genuinely free table, re-checked at booking to prevent double bookings.",
        ar: "توافر مباشر لا يعرض إلا الأوقات التي تتوفر فيها طاولة مناسبة فعلاً، مع تحقق إضافي عند الحجز يمنع الحجز المزدوج.",
      },
      {
        en: "Self-service reservations: confirmation codes, lookup by code or phone, cancel and reschedule without calling.",
        ar: "حجوزات ذاتية الإدارة: رموز تأكيد، والبحث بالرمز أو رقم الهاتف، والإلغاء وإعادة الجدولة دون اتصال.",
      },
      {
        en: "Staff admin panel: dashboard, filterable reservation list, and a day/week booking calendar with reschedule and table assignment, behind role-based access.",
        ar: "لوحة تحكم للفريق: إحصاءات، وقائمة حجوزات قابلة للتصفية، وتقويم يومي/أسبوعي مع إعادة الجدولة وتعيين الطاولات، ضمن صلاحيات حسب الدور.",
      },
      {
        en: "Pickup ordering with server-side pricing and live order-status tracking through a kitchen workflow.",
        ar: "طلبات استلام بأسعار تُحتسب في الخادم ومتابعة حية لحالة الطلب عبر مسار عمل المطبخ.",
      },
      {
        en: "Guided demo tours that let any visitor try every flow — including the staff panel via a pre-filled demo login.",
        ar: "جولات تجريبية موجّهة تتيح لأي زائر تجربة كل المسارات، بما فيها لوحة الفريق عبر دخول تجريبي جاهز.",
      },
    ],
    liveUrl: "https://bookingapp-phi-ashy.vercel.app/",
    featured: true,
    status: "completed",
  },
  {
    slug: "rentflow",
    title: {
      en: "RentFlow",
      ar: "RentFlow",
    },
    summary: {
      en: "A property-management workspace for property owners — properties, units, tenants, leases, rent, maintenance costs, documents, and profitability in one place.",
      ar: "مساحة عمل لملاك العقارات — العقارات والوحدات والمستأجرون والعقود والإيجارات وتكاليف الصيانة والمستندات والربحية في مكان واحد.",
    },
    problem: {
      en: "Owners often track rentals across scattered spreadsheets, chat threads, and memory — rent dates slip, costs stay unclear, and documents end up everywhere.",
      ar: "يتابع كثير من الملاك عقاراتهم عبر جداول متفرقة ومحادثات وذاكرتهم الشخصية، فتفوت مواعيد الإيجار وتبقى التكاليف غامضة وتتبعثر المستندات.",
    },
    solution: {
      en: "One workspace where each owner manages properties, units, tenants, leases, maintenance, and documents, tracks rent with reminders, and reads profit and cost at a glance — with every record scoped to that owner's account.",
      ar: "مساحة واحدة يدير فيها كل مالك عقاراته ووحداته ومستأجريه وعقوده وصيانته ومستنداته، ويتابع الإيجارات مع التذكيرات، ويرى الأرباح والتكاليف بنظرة واحدة — مع عزل بيانات كل مالك ضمن حسابه.",
    },
    image: "/images/projects/rentflow.webp",
    imageAlt: {
      en: "RentFlow — property-management workspace landing page",
      ar: "RentFlow — الصفحة الرئيسية لمساحة إدارة العقارات",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "next-intl",
      "Clerk",
      "Supabase (PostgreSQL, RLS, Storage)",
      "Vitest",
    ],
    features: [
      {
        en: "Complete owner-scoped management: properties, units, tenants, leases, maintenance requests, and document uploads.",
        ar: "إدارة كاملة ضمن حساب كل مالك: العقارات والوحدات والمستأجرون والعقود وطلبات الصيانة ورفع المستندات.",
      },
      {
        en: "Manual rent tracking with clear profit and cost visibility.",
        ar: "متابعة يدوية للإيجارات مع وضوح كامل للأرباح والتكاليف.",
      },
      {
        en: "Tenant-level WhatsApp reminders.",
        ar: "تذكيرات واتساب على مستوى كل مستأجر.",
      },
      {
        en: "Fully bilingual Arabic and English interface.",
        ar: "واجهة كاملة بالعربية والإنجليزية.",
      },
      {
        en: "Data protection by design: authentication, per-owner data isolation, and private document storage.",
        ar: "حماية بيانات مدمجة: مصادقة وعزل بيانات لكل مالك وتخزين خاص للمستندات.",
      },
    ],
    liveUrl: "https://rentflow.cfd",
    featured: true,
    status: "completed",
  },
  {
    slug: "insally",
    title: {
      en: "Insally",
      ar: "إنسآلي",
    },
    summary: {
      en: "A school robotics-competition platform where the points teams earn visibly evolve their animated 3D robot — with a public live garden and a robot gallery rendered right in the browser.",
      ar: "منصة مسابقات روبوتات مدرسية تتحول فيها نقاط الفرق إلى تطورٍ مرئي لروبوتها ثلاثي الأبعاد — مع حديقة مباشرة عامة ومعرض روبوتات يُعرضان داخل المتصفح.",
    },
    problem: {
      en: "Competition points sitting in spreadsheets are abstract — teams can't see their progress, and there is nothing engaging for audiences to follow between stages.",
      ar: "النقاط المسجلة في جداول تبقى أرقاماً مجردة — لا ترى الفرق تقدمها، ولا يجد الجمهور ما يتابعه بين المراحل.",
    },
    solution: {
      en: "Every point a team earns for Energy, Knowledge, or Values evolves its robot through INS versions; a public 3D live garden and a model-review gallery render all the animated robots in the browser, while an admin dashboard manages seasons, stages, teams, scoring, and reports.",
      ar: "كل نقطة يكسبها الفريق في الطاقة أو المعرفة أو القيم تطوّر روبوته عبر مستويات INS؛ وتعرض حديقة مباشرة عامة ومعرضُ نماذج جميعَ الروبوتات المتحركة داخل المتصفح، بينما تدير لوحة تحكم إدارية المواسم والمراحل والفرق والنقاط والتقارير.",
    },
    image: "/images/projects/insally.webp",
    imageAlt: {
      en: "Insally — 3D robot model gallery",
      ar: "إنسآلي — معرض نماذج الروبوتات ثلاثية الأبعاد",
    },
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Three.js",
      "React Three Fiber",
      "Supabase",
    ],
    features: [
      {
        en: "A points system (Energy / Knowledge / Values) that visibly evolves each team's robot through INS versions.",
        ar: "نظام نقاط (طاقة / معرفة / قيم) يطوّر روبوت كل فريق بشكل مرئي عبر مستويات INS.",
      },
      {
        en: "A public 3D live garden that renders every team's robot in one interactive scene.",
        ar: "حديقة مباشرة عامة تعرض روبوتات جميع الفرق في مشهد تفاعلي واحد.",
      },
      {
        en: "A robot model gallery with rigged, animated characters streamed to the browser.",
        ar: "معرض نماذج بروبوتات متحركة مزوّدة بهياكل حركة تُعرض مباشرة في المتصفح.",
      },
      {
        en: "An admin dashboard for seasons, stages, teams, scoring, and reports.",
        ar: "لوحة تحكم إدارية للمواسم والمراحل والفرق والنقاط والتقارير.",
      },
    ],
    liveUrl: "https://insally.vercel.app/",
    featured: true,
    status: "completed",
  },
];
