import type { EditorialContract } from "@edwardseshoka/contracts/editorial";

import rawEditorial from "./editorial.json" with { type: "json" };

/** Sample editorial content — the editorial service's own sample. */
export const editorialSamples = {
  editorial: rawEditorial as EditorialContract[]
} as const;
