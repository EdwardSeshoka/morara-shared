import type { DiscoverHero } from "./hero.js";
import type { DiscoverHomeSection } from "./sections.js";

export type DiscoverHomeResponse = {
  hero: DiscoverHero | null;
  sections: DiscoverHomeSection[];
};
