import type { DiscoverContract } from "@edwardseshoka/contracts/discover";
import type { WineContract } from "@edwardseshoka/contracts/catalog";
import type { RegionContract, ProducerContract } from "@edwardseshoka/contracts/provenance";
import type { EditorialContract } from "@edwardseshoka/contracts/editorial";
import type { EventContract } from "@edwardseshoka/contracts/events";
import type { ActivityContract } from "@edwardseshoka/contracts/social";

import { composeDiscover, type DiscoverSources } from "../internal/composeDiscover.js";
import type { Curation } from "../internal/curation.js";
import { createPublicWines } from "./publicWines.js";

import rawCuration from "../data/discover/discover-home.seed.json" with { type: "json" };
import rawRegions from "../data/regions/regions.json" with { type: "json" };
import rawProducers from "../data/producers/producers.json" with { type: "json" };
import rawEditorial from "../data/editorial/editorial.json" with { type: "json" };
import rawEvents from "../data/wine-events/wine-events.json" with { type: "json" };
import rawActivities from "../data/room/activities.json" with { type: "json" };

/**
 * The discover home response. Pass `wines` to compose against real catalog data
 * (the backend does this); omit it to use the sample wine catalog (app doubles).
 */
export function createDiscover(overrides: { wines?: WineContract[] } = {}): DiscoverContract {
  const sources: DiscoverSources = {
    curation: rawCuration as unknown as Curation,
    wines: overrides.wines ?? createPublicWines(),
    regions: rawRegions as RegionContract[],
    producers: rawProducers as ProducerContract[],
    editorial: rawEditorial as EditorialContract[],
    events: rawEvents as EventContract[],
    activities: rawActivities as ActivityContract[]
  };

  return composeDiscover(sources);
}
