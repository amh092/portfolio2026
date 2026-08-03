import { ExternalLink } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { CARD_GRID_CLASSES, CARD_PROJECT_CLASSES } from "@/components/ui/card";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import StatusPill from "@/components/ui/status-pill";
import TechnologyBadge from "@/components/ui/technology-badge";
import { PROJECTS } from "@/data/projects";
import type { AppLocale } from "@/types/locale";

// Prototype .ps-block: accent inline-start rule with an uppercase accent
// label (uppercase/tracking EN only) over muted step--1 body text.
const PS_BLOCK_CLASSES = "border-s-2 border-accent/40 ps-[0.85rem]";
const PS_LABEL_CLASSES =
  "mb-[0.15rem] text-[0.7rem] font-bold uppercase tracking-[0.12em] text-accent rtl:text-[0.8rem] rtl:normal-case rtl:tracking-normal";
const PS_BODY_CLASSES = "text-(length:--step--1) text-fg-muted";

export default async function ProjectsSection() {
  // The [locale] layout 404s unknown locales, so this cast is safe.
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("Projects");

  return (
    <Section id="projects" ariaLabelledby="projects-heading">
      <SectionHeading
        headingId="projects-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <div className={CARD_GRID_CLASSES}>
        {PROJECTS.map((project) => (
          <article key={project.slug} className={CARD_PROJECT_CLASSES}>
            <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-surface-2">
              <Image
                src={project.image}
                alt={project.imageAlt[locale]}
                fill
                sizes="(min-width: 960px) 400px, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
              {project.status === "completed" && (
                <span className="absolute start-[0.9rem] top-[0.9rem] z-2">
                  <StatusPill status="completed">
                    {t("statusCompleted")}
                  </StatusPill>
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col gap-[0.9rem] p-6">
              <h3 className="text-step-1">{project.title[locale]}</h3>
              <p className={PS_BODY_CLASSES}>{project.summary[locale]}</p>
              <dl className={PS_BLOCK_CLASSES}>
                <dt className={PS_LABEL_CLASSES}>{t("problemLabel")}</dt>
                <dd className={PS_BODY_CLASSES}>{project.problem[locale]}</dd>
              </dl>
              <dl className={PS_BLOCK_CLASSES}>
                <dt className={PS_LABEL_CLASSES}>{t("solutionLabel")}</dt>
                <dd className={PS_BODY_CLASSES}>{project.solution[locale]}</dd>
              </dl>
              <dl className={`${PS_BLOCK_CLASSES} space-y-[0.35rem]`}>
                <dt className={PS_LABEL_CLASSES}>{t("featuresLabel")}</dt>
                {project.features.map((feature) => (
                  <dd key={feature.en} className={PS_BODY_CLASSES}>
                    {feature[locale]}
                  </dd>
                ))}
              </dl>
              <div className="mt-auto flex flex-wrap gap-[0.4rem] pt-[0.3rem]">
                {project.technologies.map((technology) => (
                  <TechnologyBadge key={technology}>
                    {technology}
                  </TechnologyBadge>
                ))}
              </div>
              {project.liveUrl && (
                <div className="flex flex-wrap gap-2 pt-[0.4rem]">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("liveDemoAria", {
                      project: project.title[locale],
                    })}
                    className="inline-flex items-center gap-[0.4rem] rounded-sm border border-border bg-surface-2 px-[0.9rem] py-2 text-[0.8rem] font-semibold transition-all duration-250 ease-smooth hover:border-accent/50 hover:text-accent"
                  >
                    <ExternalLink aria-hidden className="size-[15px]" />
                    {t("liveDemo")}
                  </a>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
