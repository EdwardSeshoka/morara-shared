import type { WineContract } from "../catalog/index.js";
import type { EditorialContract } from "../editorial/index.js";
import type { EventContract } from "../events/index.js";
import type { ActivityContract } from "../social/index.js";
import type { DiscoverDoorwayContract } from "./doorway.js";

/**
 * A discover section: a titled, arranged list of domain contracts. The section
 * owns arrangement (id, type, title, order); the items are the same contracts
 * each domain's own api serves, reusable anywhere.
 *
 * The Fade Yield feed reads as a funnel — read → act → explore → join → belong:
 *   editorial · wines · doorways · events · room.
 */
export type DiscoverSection =
  /**
   * The transactional heart — "Worth opening now". Scannable wine rows; each
   * WineContract already carries its verdict, provenance and trust source.
   */
  | { id: string; type: "wines"; title: string; eyebrow?: string; items: WineContract[] }
  /** Merged browse cards — regions, producers and curated sets as one doorway. */
  | { id: string; type: "doorways"; title: string; eyebrow?: string; items: DiscoverDoorwayContract[] }
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
