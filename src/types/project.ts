import type { LocalizedText } from "@/types/locale";

// The overview's Project content model. repositoryUrl stays in the type for
// fidelity but is never set — cards link live demos only (resolved decision).
export type Project = {
  /** Stable slug approved in phase-1-plan §9 */
  slug: string;
  title: LocalizedText;
  summary: LocalizedText;
  problem: LocalizedText;
  solution: LocalizedText;
  /** Public path to the optimized card image (§16 manifest) */
  image: string;
  /** Alt text from the §16 manifest drafts */
  imageAlt: LocalizedText;
  technologies: string[];
  features: LocalizedText[];
  liveUrl?: string;
  repositoryUrl?: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
};
