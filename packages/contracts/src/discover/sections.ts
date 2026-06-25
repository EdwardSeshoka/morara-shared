import type {
  EditorialCard,
  ProducerCard,
  RegionCard,
  RoomActivityCard,
  WineEventCard,
} from "./cards.js";

export type DiscoverSectionAction = {
  label: string;
  href?: string;
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
