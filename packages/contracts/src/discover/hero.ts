import type { WineContract } from "../catalog/index.js";
import type { RegionContract } from "../provenance/index.js";
import type { EditorialContract } from "../editorial/index.js";
import type { WineActionContract } from "./actions.js";

/**
 * Editorial framing for a region / editorial hero, as data — eyebrow text, a
 * label, an issue volume. Formatting (figure labels, line breaks, cta styles)
 * is applied on the client.
 */
export type DiscoverFeature = {
  eyebrow?: string;
  label?: string;
  volume?: number;
};

/**
 * The featured wine hero — "This week's pick". Carries the selected
 * {@link WineContract} (a vintage) plus editorial framing and up to two actions.
 * Hero stats are derived on the client from the wine: verdict · noteCount ·
 * (vintageDisplay ?? vintage). It never invents a wine-specific shape.
 */
export type DiscoverWineHeroContract = {
  kind: "wine";
  /** Issue marker, e.g. "No. 47". */
  issueLabel?: string;
  /** Kicker, e.g. "This week's pick". */
  kicker?: string;
  /** Editorial display title, e.g. "Rubicon, once more." */
  title: string;
  description?: string;
  wine: WineContract;
  primaryAction?: WineActionContract;
  secondaryAction?: WineActionContract;
};

/**
 * The hero is a featured domain entity carrying the canonical contract of
 * whatever it features, plus a little editorial framing.
 */
export type DiscoverHero =
  | DiscoverWineHeroContract
  | { kind: "region"; feature?: DiscoverFeature; region: RegionContract }
  | { kind: "editorial"; feature?: DiscoverFeature; editorial: EditorialContract };
