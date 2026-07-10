import type { DiscoverHero } from "./hero.js";
import type { DiscoverSection } from "./sections.js";

/**
 * The discover home response: composition only. Every payload is a domain
 * contract; discover just selects and arranges them into a hero and sections.
 */
export type DiscoverContract = {
  hero: DiscoverHero | null;
  sections: DiscoverSection[];
};
