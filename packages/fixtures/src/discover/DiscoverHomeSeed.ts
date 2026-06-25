import type {
  DiscoverContentType,
  DiscoverHeroCta,
  DiscoverSectionAction,
} from "@edwardseshoka/contracts/discover";

export type DiscoverCurationItem = {
  contentType: DiscoverContentType;
  contentId: string;
  priority: number;
};

export type DiscoverCurationHero = DiscoverCurationItem & {
  placement: "hero";
  label?: string;
  volume?: number;
  isActive: boolean;
  ctas?: DiscoverHeroCta[];
};

export type DiscoverCurationSection =
  | {
      id: "this_week_in_wine";
      type: "editorial_cards";
      eyebrow?: string;
      title: string;
      action?: DiscoverSectionAction;
      itemRefs: DiscoverCurationItem[];
    }
  | {
      id: "travel_by_the_glass";
      type: "region_cards";
      eyebrow?: string;
      title: string;
      itemRefs: DiscoverCurationItem[];
    }
  | {
      id: "producers";
      type: "producer_cards";
      eyebrow?: string;
      title: string;
      itemRefs: DiscoverCurationItem[];
    }
  | {
      id: "the_room";
      type: "room_activity";
      eyebrow?: string;
      title: string;
      description?: string;
      actions?: DiscoverSectionAction[];
      itemRefs: DiscoverCurationItem[];
    }
  | {
      id: "pouring_tonight";
      type: "event_cards";
      eyebrow?: string;
      title: string;
      itemRefs: DiscoverCurationItem[];
    };

export type DiscoverHomeSeed = {
  hero: DiscoverCurationHero | null;
  sections: DiscoverCurationSection[];
};
