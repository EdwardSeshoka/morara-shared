import type { WineContract } from "@edwardseshoka/contracts/catalog";

import rawPublicWines from "../data/morara/public-wines.json" with { type: "json" };

const publicWines = rawPublicWines as WineContract[];

/** The public wine catalog — the same WineContract shape the wines api serves. */
export function createPublicWines(): WineContract[] {
  return publicWines;
}
