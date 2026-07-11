import type { WineContract } from "@edwardseshoka/contracts/catalog";

import rawPublicWines from "./public-wines.json" with { type: "json" };

const publicWines = rawPublicWines as WineContract[];

/** The public wine catalog — the same WineContract shape the catalog api serves. */
export function createPublicWines(): WineContract[] {
  return publicWines;
}
