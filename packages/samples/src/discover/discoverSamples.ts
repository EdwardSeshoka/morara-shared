import type { Curation } from "./curation.js";

import rawCuration from "../data/discover/discover-home.seed.json" with { type: "json" };

/**
 * Sample discover content — the curation document (hero + section arrangement)
 * that discover owns. The content it references lives in each contributing
 * domain's own sample (provenance, editorial, events, social).
 */
export const discoverSamples = {
  curation: rawCuration as unknown as Curation
} as const;
