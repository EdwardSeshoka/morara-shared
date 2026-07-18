import type { TrustBylineContract } from "../trust/index.js";

/**
 * A browse doorway for "Find your way in": regions, producers and curated sets
 * (and, globally, appellations · grapes · styles) share one full-photo card.
 * A doorway is a navigable browse entry — `target` says where it leads — not
 * necessarily a wine collection. Text sits outside the photo; a curator byline
 * below it. Supports "The Swartland Table" · "Cape Bordeaux" as well as "Barolo
 * DOCG" · "Napa Cabernet" · "Grower Champagne".
 */
export type DiscoverDoorwayKind =
  | "region"
  | "producer"
  | "collection"
  | "appellation"
  | "grape"
  | "style";

export type DiscoverDoorwayTarget =
  | { kind: "region"; regionId: string }
  | { kind: "producer"; producerId: string }
  | { kind: "collection"; collectionId: string }
  | { kind: "appellation"; appellationId: string }
  | { kind: "grape"; grapeVarietyId: string }
  | { kind: "style"; styleName: string };

export type DiscoverDoorwayContract = {
  id: string;
  kind: DiscoverDoorwayKind;
  title: string;
  /** Kicker line, e.g. "Region · Swartland" or "Curated · Bordeaux blends". */
  subtitle?: string;
  description?: string;
  imageUrl?: string;
  /** Denormalized count for display. */
  wineCount?: number;
  /** Who curated / owns this doorway — a trust byline (mark or member status). */
  curator?: TrustBylineContract;
  target: DiscoverDoorwayTarget;
};
