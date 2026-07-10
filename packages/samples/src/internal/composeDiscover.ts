import type {
  DiscoverContract,
  DiscoverHero,
  DiscoverSection
} from "@edwardseshoka/contracts/discover";
import type { WineContract } from "@edwardseshoka/contracts/catalog";
import type { RegionContract, ProducerContract } from "@edwardseshoka/contracts/provenance";
import type { EditorialContract } from "@edwardseshoka/contracts/editorial";
import type { EventContract } from "@edwardseshoka/contracts/events";
import type { ActivityContract } from "@edwardseshoka/contracts/social";

import type { Curation, CurationItem } from "./curation.js";

/**
 * Every pool is already its domain contract. `wines` is the injected catalog
 * (real backend data, or the sample catalog); the composer only selects
 * contracts by id and arranges them — it never transforms shapes.
 */
export type DiscoverSources = {
  curation: Curation;
  wines: WineContract[];
  regions: RegionContract[];
  producers: ProducerContract[];
  editorial: EditorialContract[];
  events: EventContract[];
  activities: ActivityContract[];
};

export function composeDiscover(sources: DiscoverSources): DiscoverContract {
  const winesById = byId(sources.wines);
  const regionsById = byId(sources.regions);
  const producersById = byId(sources.producers);
  const editorialById = byId(sources.editorial);
  const eventsById = byId(sources.events);
  const activitiesById = byId(sources.activities);

  const sections = sources.curation.sections
    .map((section): DiscoverSection | null => {
      switch (section.type) {
        case "editorial_cards":
          return {
            id: section.id,
            type: "editorial",
            title: section.title,
            eyebrow: section.eyebrow,
            items: pick(section.itemRefs, editorialById)
          };
        case "region_cards":
          return {
            id: section.id,
            type: "regions",
            title: section.title,
            eyebrow: section.eyebrow,
            items: pick(section.itemRefs, regionsById)
          };
        case "producer_cards":
          return {
            id: section.id,
            type: "producers",
            title: section.title,
            eyebrow: section.eyebrow,
            items: pick(section.itemRefs, producersById)
          };
        case "room_activity":
          return {
            id: section.id,
            type: "room",
            title: section.title,
            eyebrow: section.eyebrow,
            description: section.description,
            items: pick(section.itemRefs, activitiesById)
          };
        case "event_cards":
          return {
            id: section.id,
            type: "events",
            title: section.title,
            eyebrow: section.eyebrow,
            items: pick(section.itemRefs, eventsById)
          };
        default:
          return null;
      }
    })
    .filter(present);

  return { hero: composeHero(sources.curation.hero, winesById), sections };
}

function composeHero(
  hero: Curation["hero"],
  winesById: Map<string, WineContract>
): DiscoverHero | null {
  if (!hero || !hero.isActive || hero.contentType !== "wine") {
    return null;
  }

  const wine = winesById.get(hero.contentId);
  if (!wine) {
    return null;
  }

  const feature = { eyebrow: undefined, label: hero.label, volume: hero.volume };
  const hasFeature = feature.label !== undefined || feature.volume !== undefined;

  return hasFeature ? { kind: "wine", feature, wine } : { kind: "wine", wine };
}

/** Select the referenced contracts from a pool, in curation priority order. */
function pick<TItem>(refs: CurationItem[], pool: Map<string, TItem>): TItem[] {
  return refs
    .slice()
    .sort((left, right) => left.priority - right.priority)
    .map((ref) => pool.get(ref.contentId))
    .filter(present);
}

function byId<TItem extends { id: string }>(items: TItem[]): Map<string, TItem> {
  return new Map(items.map((item) => [item.id, item]));
}

function present<TItem>(item: TItem | null | undefined): item is TItem {
  return item != null;
}
