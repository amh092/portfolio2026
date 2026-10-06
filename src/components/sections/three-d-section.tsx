import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  CARD_GRID_CLASSES,
  CARD_THREE_D_CLASSES,
} from "@/components/ui/card";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import SectionHeading from "@/components/ui/section-heading";
import TechnologyBadge from "@/components/ui/technology-badge";
import ModelViewer from "@/components/three-d/model-viewer";
import ShowcaseProvider from "@/components/three-d/showcase-provider";
import { THREE_D_PROJECTS } from "@/data/three-d-projects";
import type { AppLocale } from "@/types/locale";

export default async function ThreeDSection() {
  // The [locale] layout rejects unknown locales.
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations("ThreeD");

  return (
    <Section id="three-d" ariaLabelledby="three-d-heading">
      <SectionHeading
        headingId="three-d-heading"
        eyebrow={t("eyebrow")}
        title={t("title")}
      />
      <ShowcaseProvider>
        <Reveal variant="grid" className={CARD_GRID_CLASSES}>
          {THREE_D_PROJECTS.map((project) => {
            const preview = (
              <Image
                src={project.previewImage}
                alt={project.previewImageAlt[locale]}
                fill
                sizes="(min-width: 946px) 400px, (min-width: 638px) 50vw, 100vw"
                className="object-contain"
              />
            );

            return (
              <article
                key={project.slug}
                aria-labelledby={`${project.slug}-title`}
                className={CARD_THREE_D_CLASSES}
              >
                {project.interactive && project.modelUrl ? (
                  <ModelViewer
                    slug={project.slug}
                    modelUrl={project.modelUrl}
                    title={project.title[locale]}
                  >
                    {preview}
                  </ModelViewer>
                ) : (
                  <div className="relative aspect-4/3 overflow-hidden rounded-md border border-border bg-bg-2">
                    {preview}
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-[0.9rem] p-6">
                  <h3 id={`${project.slug}-title`} className="text-step-1">
                    {project.title[locale]}
                  </h3>
                  <p className="text-(length:--step--1) text-fg-muted">
                    {project.description[locale]}
                  </p>
                  <div className="mt-auto flex flex-wrap gap-[0.4rem] pt-[0.3rem]">
                    {project.tools.map((tool) => (
                      <TechnologyBadge key={tool}>
                        <bdi>{tool}</bdi>
                      </TechnologyBadge>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </Reveal>
      </ShowcaseProvider>
    </Section>
  );
}
