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
  | "region_cards"
  | "producer_cards"
  | "room_activity"
  | "event_cards";

export type CurationSection = {
  id: string;
  type: CurationSectionType;
  eyebrow?: string;
  title: string;
  description?: string;
  itemRefs: CurationItem[];
};

export type Curation = {
  hero: CurationHero | null;
  sections: CurationSection[];
};
