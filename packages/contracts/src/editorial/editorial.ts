import type { TrustBylineContract } from "../trust/index.js";

export type EditorialContentType = "article" | "guide" | "story" | "new_arrival";

/**
 * What a piece of editorial is *about*. Editorial is not a wine — it may concern
 * a vintage, a label, a producer, a region, an appellation, a grape, or a whole
 * "vintage report" (e.g. "2018 in Stellenbosch"), which is how Kgwari models a
 * global wine view without pretending 2018 is a single wine.
 */
export type EditorialSubjectContract =
  | { kind: "wine"; wineVintageId: string; wineLabelId?: string }
  | { kind: "wine_label"; wineLabelId: string }
  | { kind: "producer"; producerId: string }
  | { kind: "region"; regionId: string }
  | { kind: "appellation"; appellationId: string }
  | { kind: "grape"; grapeVarietyId: string }
  | { kind: "vintage_report"; regionId?: string; countryCode?: string; vintage: number };

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
  /**
   * The author / byline that carries trust — a name plus a verification mark
   * (`tier`) or a member `status` word, plus a role descriptor ("sommelier").
   */
  author?: TrustBylineContract;
  /** What the piece is about — powers "read more like this" and cross-linking. */
  subject?: EditorialSubjectContract;
};
