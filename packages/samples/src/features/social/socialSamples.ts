import type {
  ActivityContract,
  TastingNoteContract
} from "@edwardseshoka/contracts/social";

import rawActivities from "./activities.json" with { type: "json" };
import rawNotes from "./tasting-notes.json" with { type: "json" };

/** Sample social content (room activity + durable tasting notes) — the social service's own sample. */
export const socialSamples = {
  activities: rawActivities as ActivityContract[],
  tastingNotes: rawNotes as TastingNoteContract[]
} as const;
