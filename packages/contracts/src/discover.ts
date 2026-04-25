export type DiscoverContentType =
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

export type DiscoverHeroType = "wine" | "event" | "article" | "collection" | "estate";

export type DiscoverHeroCta = {
  id: string;
  label: string;
  style?: "primary" | "secondary" | "ghost" | "icon";
};

export type DiscoverHeroStat = {
  id: string;
  value: string;
  label: string;
};

export type DiscoverDisplayTitle = {
  lineOne: string;
  lineTwo?: string;
};

export type BaseDiscoverHero = {
  type: DiscoverHeroType;
  id: string;
  title: string;
  displayTitle?: DiscoverDisplayTitle;
  subtitle?: string;
  description?: string;
  label?: string;
  volume?: number;
  issueLabel?: string;
  imageUrl?: string;
  ctas: DiscoverHeroCta[];
  stats: DiscoverHeroStat[];
};

export type DiscoverWineHero = BaseDiscoverHero & {
  type: "wine";
  wineId: string;
  estateName?: string;
  regionName?: string;
  styleName?: string;
  vintage?: number;
  averageRating?: number;
  totalTastingNotes?: number;
  price?: number;
  currency?: string;
  figureLabel?: string;
};

export type DiscoverEventHero = BaseDiscoverHero & {
  type: "event";
  eventId: string;
  date?: string;
  location?: string;
};

export type DiscoverArticleHero = BaseDiscoverHero & {
  type: "article";
  articleId: string;
  authorName?: string;
  publishedAt?: string;
};

export type DiscoverCollectionHero = BaseDiscoverHero & {
  type: "collection";
  collectionId: string;
};

export type DiscoverEstateHero = BaseDiscoverHero & {
  type: "estate";
  estateId: string;
  location?: string;
};

export type DiscoverHero =
  | DiscoverWineHero
  | DiscoverEventHero
  | DiscoverArticleHero
  | DiscoverCollectionHero
  | DiscoverEstateHero;

export type DiscoverSectionAction = {
  label: string;
  href?: string;
};

export type EditorialContentType = "article" | "guide" | "story" | "new_arrival";

export type EditorialCard = {
  id: string;
  contentType: EditorialContentType;
  title: string;
  categoryLabel?: string;
  description?: string;
  imageUrl?: string;
  ctaLabel?: string;
};

export type RegionCard = {
  id: string;
  name: string;
  country?: string;
  province?: string;
  imageUrl?: string;
  producerCount?: number;
  wineCount?: number;
  description?: string;
};

export type ProducerCard = {
  id: string;
  name: string;
  regionId?: string;
  regionName?: string;
  imageUrl?: string;
  description?: string;
  wineCount?: number;
};

export type RoomActivityType = "check_in" | "review" | "tasting_note";

export type RoomActivityUser = {
  id: string;
  displayName: string;
  initials?: string;
  avatarColor?: string;
  role?: "enthusiast" | "sommelier" | "farmer" | "collector" | "producer";
};

export type RoomActivityWine = {
  id: string;
  name: string;
  vintage?: number;
};

export type RoomActivityCard = {
  id: string;
  activityType: RoomActivityType;
  user: RoomActivityUser;
  wine: RoomActivityWine;
  rating?: number;
  note?: string;
  createdAt: string;
  relativeTimeLabel?: string;
};

export type WineEventType =
  | "sommelier_led"
  | "winemaker_dinner"
  | "tasting"
  | "pairing"
  | "launch";

export type WineEventCard = {
  id: string;
  title: string;
  eventType?: WineEventType;
  eventTypeLabel?: string;
  startDateTime?: string;
  startTimeLabel?: string;
  venueName?: string;
  location?: string;
  seatsAvailable?: number;
  imageUrl?: string;
};

export type ThisWeekInWineSection = {
  id: "this_week_in_wine";
  type: "editorial_cards";
  eyebrow?: string;
  title: string;
  action?: DiscoverSectionAction;
  items: EditorialCard[];
};

export type TravelByTheGlassSection = {
  id: "travel_by_the_glass";
  type: "region_cards";
  eyebrow?: string;
  title: string;
  items: RegionCard[];
};

export type ProducersSection = {
  id: "producers";
  type: "producer_cards";
  eyebrow?: string;
  title: string;
  items: ProducerCard[];
};

export type RoomSection = {
  id: "the_room";
  type: "room_activity";
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: DiscoverSectionAction[];
  items: RoomActivityCard[];
};

export type PouringTonightSection = {
  id: "pouring_tonight";
  type: "event_cards";
  eyebrow?: string;
  title: string;
  items: WineEventCard[];
};

export type DiscoverHomeSection =
  | ThisWeekInWineSection
  | TravelByTheGlassSection
  | ProducersSection
  | RoomSection
  | PouringTonightSection;

export type DiscoverHomeResponse = {
  hero: DiscoverHero | null;
  sections: DiscoverHomeSection[];
};

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

export type DiscoverHeroStatContract = DiscoverHeroStat;
export type DiscoverHeroContract = DiscoverHero;
export type DiscoverRegionContract = RegionCard;
export type DiscoverRoomNoteContract = RoomActivityCard;
export type DiscoverWeeklyEditorialItemContract = EditorialCard;
export type DiscoverWineCollectionContract = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  badge?: { label: string };
  coverImages: string[];
  wineIds: string[];
};
