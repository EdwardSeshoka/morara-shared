import listWines from "./seeds/wines/list-wines.json" with { type: "json" };
import featuredWines from "./seeds/wines/featured-wines.json" with { type: "json" };
import wineDetail from "./seeds/wines/wine-detail.json" with { type: "json" };
import listCollections from "./seeds/collections/list-collections.json" with { type: "json" };
import collectionDetail from "./seeds/collections/collection-detail.json" with { type: "json" };
import listEvents from "./seeds/events/list-events.json" with { type: "json" };
import featuredEvents from "./seeds/events/featured-events.json" with { type: "json" };
import eventDetail from "./seeds/events/event-detail.json" with { type: "json" };

export {
  listWines,
  featuredWines,
  wineDetail,
  listCollections,
  collectionDetail,
  listEvents,
  featuredEvents,
  eventDetail
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

export const fixtures = {
  wines: wineFixtures,
  collections: collectionFixtures,
  events: eventFixtures
};

export default fixtures;
