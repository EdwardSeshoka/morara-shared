import type { EventContract } from "@edwardseshoka/contracts/events";

import rawEvents from "../data/wine-events/wine-events.json" with { type: "json" };

/** Sample events content — the events service's own sample. */
export const eventsSamples = {
  events: rawEvents as EventContract[]
} as const;
