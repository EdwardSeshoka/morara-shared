import type {
  EditorialCard,
  RegionCard,
  RoomActivityCard,
} from "./cards.js";
import type { DiscoverHero, DiscoverHeroStat } from "./hero.js";
import type { DiscoverHomeSection } from "./sections.js";

export type DiscoverHomeResponse = {
  hero: DiscoverHero | null;
  sections: DiscoverHomeSection[];
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
