import type { WineContract } from "../catalog/index.js";
import type { RegionContract } from "../provenance/index.js";
import type { EditorialContract } from "../editorial/index.js";

/**
 * Editorial framing for the hero, as data — eyebrow text, a label, an issue
 * volume. All formatting (figure labels, line breaks, stat strings, cta styles)
 * is applied on the client.
 */
export type DiscoverFeature = {
  eyebrow?: string;
  label?: string;
  volume?: number;
};

/**
 * The hero is a featured domain entity: it carries the canonical contract of
 * whatever it features — the same shape that entity's own api returns — plus a
 * little editorial framing. It never invents a hero-specific shape.
 */
export type DiscoverHero =
  | { kind: "wine"; feature?: DiscoverFeature; wine: WineContract }
  | { kind: "region"; feature?: DiscoverFeature; region: RegionContract }
  | { kind: "editorial"; feature?: DiscoverFeature; editorial: EditorialContract };
