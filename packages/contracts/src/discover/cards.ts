import type {
  EditorialContentType,
  RoomActivityType,
  WineEventType,
} from "./content.js";

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
