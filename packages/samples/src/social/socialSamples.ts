import type { ActivityContract } from "@edwardseshoka/contracts/social";

import rawActivities from "../data/room/activities.json" with { type: "json" };

/** Sample social content (room activity) — the social service's own sample. */
export const socialSamples = {
  activities: rawActivities as ActivityContract[]
} as const;
