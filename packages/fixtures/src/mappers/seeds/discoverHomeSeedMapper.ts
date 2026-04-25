import type {
  DiscoverContentType,
  DiscoverCurationItem,
  DiscoverHomeResponse,
  DiscoverHomeSeed,
  DiscoverHomeSection,
  DiscoverHero,
  DiscoverWineHero,
  EditorialCard,
  ProducerCard,
  RegionCard,
  RoomActivityCard,
  RoomActivityType,
  RoomActivityUser,
  WineContract,
  WineEventCard
} from "@edwardseshoka/contracts";

import articlesSeed from "../../seeds/articles/articles.seed.json" with { type: "json" };
import discoverHomeSeed from "../../seeds/discover/discover-home.seed.json" with { type: "json" };
import estatesSeed from "../../seeds/estates/estates.seed.json" with { type: "json" };
import moraraPublicWines from "../../seeds/morara/public-wines.json" with { type: "json" };
import regionsSeed from "../../seeds/regions/regions.seed.json" with { type: "json" };
import roomActivitiesSeed from "../../seeds/room/room-activities.seed.json" with { type: "json" };
import roomUsersSeed from "../../seeds/room/users.seed.json" with { type: "json" };
import wineEventsSeed from "../../seeds/wine-events/wine-events.seed.json" with { type: "json" };

type RegionSeed = RegionCard;

type EstateSeed = {
  id: string;
  name: string;
  regionId?: string;
  imageUrl?: string;
  description?: string;
  wineIds?: string[];
  wineCount?: number;
};

type ArticleSeed = EditorialCard;

type RoomUserSeed = RoomActivityUser;

type RoomActivitySeed = {
  id: string;
  type: RoomActivityType;
  userId: string;
  wineId: string;
  rating?: number;
  note?: string;
  createdAt: string;
  relativeTimeLabel?: string;
};

type WineEventSeed = WineEventCard & {
  regionId?: string;
  wineIds?: string[];
  producerIds?: string[];
};

export type DiscoverHomeSeedSources = {
  seed: DiscoverHomeSeed;
  wines: WineContract[];
  regions: RegionSeed[];
  estates: EstateSeed[];
  articles: ArticleSeed[];
  users: RoomUserSeed[];
  roomActivities: RoomActivitySeed[];
  events: WineEventSeed[];
};

export type DiscoverHomeSeedSourceOverrides = Partial<DiscoverHomeSeedSources>;

export const createDiscoverHomeResponseFromSeeds = (
  overrides: DiscoverHomeSeedSourceOverrides = {}
): DiscoverHomeResponse =>
  mapDiscoverHomeSeedToResponse({
    seed: overrides.seed ?? (discoverHomeSeed as DiscoverHomeSeed),
    wines: overrides.wines ?? (moraraPublicWines as WineContract[]),
    regions: overrides.regions ?? (regionsSeed as RegionSeed[]),
    estates: overrides.estates ?? (estatesSeed as EstateSeed[]),
    articles: overrides.articles ?? (articlesSeed as ArticleSeed[]),
    users: overrides.users ?? (roomUsersSeed as RoomUserSeed[]),
    roomActivities: overrides.roomActivities ?? (roomActivitiesSeed as RoomActivitySeed[]),
    events: overrides.events ?? (wineEventsSeed as WineEventSeed[])
  });

export const mapDiscoverHomeSeedToResponse = (sources: DiscoverHomeSeedSources): DiscoverHomeResponse => {
  const winesById = byId(sources.wines);
  const regionsById = byId(sources.regions);
  const estatesById = byId(sources.estates);
  const articlesById = byId(sources.articles);
  const usersById = byId(sources.users);
  const roomActivitiesById = byId(sources.roomActivities);
  const eventsById = byId(sources.events);

  return {
    hero: mapHero(sources.seed.hero, winesById),
    sections: sources.seed.sections
      .map((section): DiscoverHomeSection | null => {
        switch (section.type) {
          case "editorial_cards":
            return {
              id: section.id,
              type: section.type,
              eyebrow: section.eyebrow,
              title: section.title,
              action: section.action,
              items: orderedRefs(section.itemRefs, ["article", "guide", "story", "new_arrival"])
                .map((item) => articlesById.get(item.contentId))
                .filter(isPresent)
                .map(toEditorialCard)
            };
          case "region_cards":
            return {
              id: section.id,
              type: section.type,
              eyebrow: section.eyebrow,
              title: section.title,
              items: orderedRefs(section.itemRefs, "region")
                .map((item) => regionsById.get(item.contentId))
                .filter(isPresent)
                .map(toRegionCard)
            };
          case "producer_cards":
            return {
              id: section.id,
              type: section.type,
              eyebrow: section.eyebrow,
              title: section.title,
              items: orderedRefs(section.itemRefs, "estate")
                .map((item) => estatesById.get(item.contentId))
                .filter(isPresent)
                .map((estate) => toProducerCard(estate, regionsById))
            };
          case "room_activity":
            return {
              id: section.id,
              type: section.type,
              eyebrow: section.eyebrow,
              title: section.title,
              description: section.description,
              actions: section.actions,
              items: orderedRefs(section.itemRefs, "room_activity")
                .map((item) => roomActivitiesById.get(item.contentId))
                .filter(isPresent)
                .map((activity) => toRoomActivityCard(activity, usersById, winesById))
                .filter(isPresent)
            };
          case "event_cards":
            return {
              id: section.id,
              type: section.type,
              eyebrow: section.eyebrow,
              title: section.title,
              items: orderedRefs(section.itemRefs, "event")
                .map((item) => eventsById.get(item.contentId))
                .filter(isPresent)
                .map(toWineEventCard)
            };
          default:
            return null;
        }
      })
      .filter(isPresent)
  };
};

const mapHero = (
  heroSeed: DiscoverHomeSeed["hero"],
  winesById: Map<string, WineContract>
): DiscoverHero | null => {
  if (!heroSeed?.isActive || heroSeed.contentType !== "wine") {
    return null;
  }

  const wine = winesById.get(heroSeed.contentId);

  if (!wine) {
    return null;
  }

  const subtitle = [wine.vintage ?? wine.year, wine.styleName, wine.region].filter(Boolean).join(" · ");
  const noteCount = wine.rating?.count ?? 0;
  const averageRating = wine.rating?.value;

  const hero: DiscoverWineHero = {
    type: "wine",
    id: `hero-${wine.id}`,
    wineId: wine.id,
    title: wine.name,
    displayTitle: {
      lineOne: `${wine.name},`,
      lineTwo: wine.id === "rubicon-2018" ? "once more." : undefined
    },
    subtitle,
    description: wine.description,
    label: heroSeed.label,
    volume: heroSeed.volume,
    issueLabel: heroSeed.volume ? `WEEKLY · VOLUME ${heroSeed.volume}` : undefined,
    imageUrl: wine.imageUrl,
    ctas: heroSeed.ctas ?? [
      { id: "request_taste", label: "Request a taste", style: "primary" },
      { id: "add_to_cellar", label: "Add to cellar", style: "icon" },
      { id: "open_story", label: "Open the story", style: "secondary" }
    ],
    stats: [
      {
        id: "average_note",
        value: averageRating ? averageRating.toFixed(1) : "4.5",
        label: "Average note"
      },
      {
        id: "member_notes",
        value: noteCount.toLocaleString("en-ZA"),
        label: "Member notes"
      },
      {
        id: "vintage",
        value: `${wine.vintage ?? wine.year}`,
        label: "Vintage"
      }
    ],
    estateName: wine.estate,
    regionName: wine.region,
    styleName: wine.styleName,
    vintage: wine.vintage ?? wine.year,
    averageRating,
    totalTastingNotes: noteCount,
    price: wine.price?.amount,
    currency: wine.price?.currency,
    figureLabel: "FIG. 01"
  };

  return hero;
};

const toEditorialCard = (article: ArticleSeed): EditorialCard => ({
  id: article.id,
  contentType: article.contentType,
  title: article.title,
  categoryLabel: article.categoryLabel,
  description: article.description,
  imageUrl: article.imageUrl,
  ctaLabel: article.ctaLabel
});

const toRegionCard = (region: RegionSeed): RegionCard => ({
  id: region.id,
  name: region.name,
  country: region.country,
  province: region.province,
  imageUrl: region.imageUrl,
  producerCount: region.producerCount,
  wineCount: region.wineCount,
  description: region.description
});

const toProducerCard = (estate: EstateSeed, regionsById: Map<string, RegionSeed>): ProducerCard => ({
  id: estate.id,
  name: estate.name,
  regionId: estate.regionId,
  regionName: estate.regionId ? regionsById.get(estate.regionId)?.name : undefined,
  imageUrl: estate.imageUrl,
  description: estate.description,
  wineCount: estate.wineCount ?? estate.wineIds?.length
});

const toRoomActivityCard = (
  activity: RoomActivitySeed,
  usersById: Map<string, RoomUserSeed>,
  winesById: Map<string, WineContract>
): RoomActivityCard | null => {
  const user = usersById.get(activity.userId);
  const wine = winesById.get(activity.wineId);

  if (!user || !wine) {
    return null;
  }

  return {
    id: activity.id,
    activityType: activity.type,
    user,
    wine: {
      id: wine.id,
      name: wine.name,
      vintage: wine.vintage ?? wine.year
    },
    rating: activity.rating,
    note: activity.note,
    createdAt: activity.createdAt,
    relativeTimeLabel: activity.relativeTimeLabel
  };
};

const toWineEventCard = (event: WineEventSeed): WineEventCard => ({
  id: event.id,
  title: event.title,
  eventType: event.eventType,
  eventTypeLabel: event.eventTypeLabel,
  startDateTime: event.startDateTime,
  startTimeLabel: event.startTimeLabel,
  venueName: event.venueName,
  location: event.location,
  seatsAvailable: event.seatsAvailable,
  imageUrl: event.imageUrl
});

const orderedRefs = (
  items: DiscoverCurationItem[],
  contentType: DiscoverContentType | DiscoverContentType[]
): DiscoverCurationItem[] => {
  const contentTypes = Array.isArray(contentType) ? contentType : [contentType];

  return items
    .filter((item) => contentTypes.includes(item.contentType))
    .slice()
    .sort((left, right) => left.priority - right.priority);
};

const byId = <TItem extends { id: string }>(items: TItem[]): Map<string, TItem> =>
  new Map(items.map((item) => [item.id, item]));

const isPresent = <TItem>(item: TItem | null | undefined): item is TItem => item != null;
