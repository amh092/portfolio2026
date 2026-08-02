import { type Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import AboutSection from "@/components/sections/about-section";
import BusinessGrowthSection from "@/components/sections/business-growth-section";
import ContactSection from "@/components/sections/contact-section";
import HeroSection from "@/components/sections/hero-section";
import ProjectsSection from "@/components/sections/projects-section";
import ServicesSection from "@/components/sections/services-section";
import SkillsSection from "@/components/sections/skills-section";
import ThreeDSection from "@/components/sections/three-d-section";

// Section order per phase-1-plan §2; anchor IDs live in each section
// component and must stay in sync with src/data/sections.ts (scrollspy).
export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);

  return (
    <main id="main">
      <HeroSection />
      <BusinessGrowthSection />
      <ServicesSection />
      <ProjectsSection />
      <ThreeDSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
