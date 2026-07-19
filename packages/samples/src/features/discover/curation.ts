import type { DiscoverDoorwayContract } from "@edwardseshoka/contracts/discover";

/**
 * The curation document shape — selection + ordering only. It references content
 * by id and priority and frames the hero; the backend resolves it against the
 * content pools into a `DiscoverContract`. This is shared seed, not composition.
 */
export type CurationContentType =
  | "wine"
  | "article"
  | "guide"
  | "story"
  | "new_arrival"
  | "region"
  | "estate"
  | "event"
  | "room_activity"
  | "collection";

export type CurationItem = {
  contentType: CurationContentType;
  contentId: string;
  priority: number;
};

export type CurationHero = CurationItem & {
  placement: "hero";
  label?: string;
  volume?: number;
  isActive: boolean;
};

export type CurationSectionType =
  | "editorial_cards"
  | "doorway_cards"
  | "room_activity"
  | "event_cards";

/**
 * A section that selects pool-backed content by reference (editorial, events,
 * room activity). The backend resolves each ref against that domain's pool.
 */
export type CurationRefSection = {
  id: string;
  type: "editorial_cards" | "room_activity" | "event_cards";
  eyebrow?: string;
  title: string;
  description?: string;
  itemRefs: CurationItem[];
};

/**
 * A "Find your way in" section carrying fully-curated browse doorways inline —
 * regions, producers, curated collections and appellations, each with an
 * editorial title, a curator byline and a navigable `target`. Doorways are
 * merchandising, not stored entities, so they live on the plan itself.
 */
export type CurationDoorwaySection = {
  id: string;
  type: "doorway_cards";
  eyebrow?: string;
  title: string;
  description?: string;
  doorways: DiscoverDoorwayContract[];
};

export type CurationSection = CurationRefSection | CurationDoorwaySection;

export type Curation = {
  hero: CurationHero | null;
  sections: CurationSection[];
};
