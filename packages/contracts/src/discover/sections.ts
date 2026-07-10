import type { RegionContract, ProducerContract } from "../provenance/index.js";
import type { EditorialContract } from "../editorial/index.js";
import type { EventContract } from "../events/index.js";
import type { ActivityContract } from "../social/index.js";

/**
 * A discover section: a titled, arranged list of domain contracts. The section
 * owns arrangement (id, type, title, order); the items are the same contracts
 * each domain's own api serves, reusable anywhere.
 */
export type DiscoverSection =
  | { id: string; type: "regions"; title: string; eyebrow?: string; items: RegionContract[] }
  | { id: string; type: "producers"; title: string; eyebrow?: string; items: ProducerContract[] }
  | { id: string; type: "editorial"; title: string; eyebrow?: string; items: EditorialContract[] }
  | { id: string; type: "events"; title: string; eyebrow?: string; items: EventContract[] }
  | {
      id: string;
      type: "room";
      title: string;
      eyebrow?: string;
      description?: string;
      items: ActivityContract[];
    };
