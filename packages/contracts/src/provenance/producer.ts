/**
 * A wine producer / estate. `regionName` is a denormalized scalar for display;
 * the full region is fetched from the provenance region api when needed.
 */
export type ProducerContract = {
  id: string;
  name: string;
  /** ISO country code, e.g. "ZA", "FR" — for global data quality. */
  countryCode?: string;
  regionId?: string;
  regionName?: string;
  imageUrl?: string;
  description?: string;
  wineCount: number;
};
