import type {
  AppellationContract,
  ProducerContract,
  RegionContract
} from "@edwardseshoka/contracts/provenance";

import rawRegions from "./regions.json" with { type: "json" };
import rawProducers from "./producers.json" with { type: "json" };
import rawAppellations from "./appellations.json" with { type: "json" };

/** Sample provenance content (regions + producers + appellations) — the provenance service's own sample. */
export const provenanceSamples = {
  regions: rawRegions as RegionContract[],
  producers: rawProducers as ProducerContract[],
  appellations: rawAppellations as AppellationContract[]
} as const;
