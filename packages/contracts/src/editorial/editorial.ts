export type EditorialContentType = "article" | "guide" | "story" | "new_arrival";

/**
 * A piece of editorial content. The `contentType` discriminates article / guide
 * / story / new arrival — one contract rather than a type per variant.
 */
export type EditorialContract = {
  id: string;
  contentType: EditorialContentType;
  title: string;
  categoryLabel?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
};
