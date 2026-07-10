/**
 * Private curation document — selection + ordering only. Resolved into a
 * DiscoverContract by composeDiscover; never exported from the package.
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
