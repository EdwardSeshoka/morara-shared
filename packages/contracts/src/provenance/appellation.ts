import type { WineOriginSystemContract } from "../catalog/index.js";

/**
 * A protected-origin appellation — WO Stellenbosch, AOC Pauillac, DOCG Barolo,
 * Napa Valley AVA. Distinct from a {@link RegionContract}: an appellation is the
 * legal origin denomination, tied to a region and a country's origin `system`,
 * and can nest (e.g. an AVA within an AVA) via `parentAppellationId`.
 */
export type AppellationContract = {
  id: string;
  name: string;
  countryCode: string;
  regionId: string;
  system: WineOriginSystemContract;
  parentAppellationId?: string;
  description?: string;
};
