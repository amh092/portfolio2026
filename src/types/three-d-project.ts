import type { LocalizedText } from "@/types/locale";

// The overview's 3D content model, plus the approved preview alt text.
export type ThreeDProject = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  modelUrl?: string;
  previewImage: string;
  previewImageAlt: LocalizedText;
  tools: string[];
  interactive: boolean;
};
