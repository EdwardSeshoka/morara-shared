/**
 * A wine producer / estate. `regionName` is a denormalized scalar for display;
 * the full region is fetched from the provenance region api when needed.
 */
export type ProducerContract = {
  id: string;
  name: string;
  regionId?: string;
  regionName?: string;
  imageUrl?: string;
  description?: string;
  wineCount: number;
};
