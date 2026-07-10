/**
 * A wine region. Rich enough to drive any region UI on its own; relationships
 * (its producers, its wines) are composed at the screen tier, never nested here.
 */
export type RegionContract = {
  id: string;
  name: string;
  country: string;
  province?: string;
  imageUrl?: string;
  description?: string;
  producerCount: number;
  wineCount: number;
};
