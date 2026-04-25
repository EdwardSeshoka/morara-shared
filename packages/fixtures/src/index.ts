import listWines from "./seeds/wines/list-wines.json" with { type: "json" };
import featuredWines from "./seeds/wines/featured-wines.json" with { type: "json" };
import wineDetail from "./seeds/wines/wine-detail.json" with { type: "json" };
import listCollections from "./seeds/collections/list-collections.json" with { type: "json" };
import collectionDetail from "./seeds/collections/collection-detail.json" with { type: "json" };
import listEvents from "./seeds/events/list-events.json" with { type: "json" };
import featuredEvents from "./seeds/events/featured-events.json" with { type: "json" };
import eventDetail from "./seeds/events/event-detail.json" with { type: "json" };
import moraraPublicWines from "./seeds/morara/public-wines.json" with { type: "json" };
import articlesSeed from "./seeds/articles/articles.seed.json" with { type: "json" };
import discoverHomeSeed from "./seeds/discover/discover-home.seed.json" with { type: "json" };
import estatesSeed from "./seeds/estates/estates.seed.json" with { type: "json" };
import regionsSeed from "./seeds/regions/regions.seed.json" with { type: "json" };
import roomActivitiesSeed from "./seeds/room/room-activities.seed.json" with { type: "json" };
import roomUsersSeed from "./seeds/room/users.seed.json" with { type: "json" };
import wineEventsSeed from "./seeds/wine-events/wine-events.seed.json" with { type: "json" };

export {
  createDiscoverHomeResponseFromSeeds,
  mapDiscoverHomeSeedToResponse
} from "./mappers/seeds/discoverHomeSeedMapper.js";

export {
  listWines,
  featuredWines,
  wineDetail,
  listCollections,
  collectionDetail,
  listEvents,
  featuredEvents,
  eventDetail,
  moraraPublicWines,
  articlesSeed,
  discoverHomeSeed,
  estatesSeed,
  regionsSeed,
  roomActivitiesSeed,
  roomUsersSeed,
  wineEventsSeed
};

export const wineFixtures = {
  listWines,
  featuredWines,
  wineDetail
};

export const collectionFixtures = {
  listCollections,
  collectionDetail
};

export const eventFixtures = {
  listEvents,
  featuredEvents,
  eventDetail
};

export const discoverFixtures = {
  discoverHomeSeed,
  articlesSeed,
  estatesSeed,
  regionsSeed,
  roomActivitiesSeed,
  roomUsersSeed,
  wineEventsSeed
};

export const fixtures = {
  wines: wineFixtures,
  collections: collectionFixtures,
  events: eventFixtures,
  discover: discoverFixtures,
  morara: {
    publicWines: moraraPublicWines
  }
};

export default fixtures;
