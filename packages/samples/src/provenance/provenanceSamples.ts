import type { ProducerContract, RegionContract } from "@edwardseshoka/contracts/provenance";

import rawRegions from "../data/regions/regions.json" with { type: "json" };
import rawProducers from "../data/producers/producers.json" with { type: "json" };

/** Sample provenance content (regions + producers) — the provenance service's own sample. */
export const provenanceSamples = {
  regions: rawRegions as RegionContract[],
  producers: rawProducers as ProducerContract[]
} as const;
