/**
 * A wine region — rich enough to drive any region UI on its own, and now aware
 * of a global hierarchy: Western Cape → Coastal Region → Stellenbosch; Bordeaux
 * → Médoc → Pauillac. Walk up via `parentRegionId`; `regionType` says which rung.
 * Relationships (its producers, its wines) are composed at the screen tier.
 */
export type RegionType =
  | "country"
  | "province"
  | "region"
  | "district"
  | "ward"
  | "appellation";

export type RegionContract = {
  id: string;
  name: string;
  /** Display country label, e.g. "South Africa". */
  country: string;
  /** ISO-ish app country code, e.g. "ZA". */
  countryCode?: string;
  province?: string;
  /** Parent in the region hierarchy. */
  parentRegionId?: string;
  regionType?: RegionType;
  imageUrl?: string;
  description?: string;
  producerCount: number;
  wineCount: number;
};
