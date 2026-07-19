---
"@edwardseshoka/contracts": minor
"@edwardseshoka/samples": major
---

Enrich discover so the Fade Yield home screen composes end-to-end.

**contracts** — `EditorialContract` gains an optional `author?: TrustBylineContract`
(the byline shown on every editorial card: name + verification mark or member
status + role). Additive; no existing field changes.

**samples (breaking — curation shape)** — the curation document now drives the
funnel directly:

- `CurationSection` is a discriminated union. `region_cards` / `producer_cards`
  are replaced by a single `doorway_cards` section that carries fully-curated
  browse doorways inline (`DiscoverDoorwayContract[]`) — regions, producers,
  curated collections and appellations, each with an editorial title, a curator
  byline and a navigable `target`. Consumers that composed doorways by deriving
  from region/producer refs must read the inline `doorways` instead.
- Editorial fixtures gain author bylines; two events are added
  (`event_chenin_masterclass` — online / open, no seat cap; `event_cap_classique_brunch`
  — sold out) and the curation references all four, so the events rail and its
  seat states (open · seats-left · sold-out) are seeded.
- Sections are ordered to the funnel (editorial · doorways · events · room); the
  `discover-response.json` fixture is updated to match (authors + four events).
