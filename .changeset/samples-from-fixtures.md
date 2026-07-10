---
"@edwardseshoka/samples": major
---

Rename `@edwardseshoka/fixtures` to `@edwardseshoka/samples` and expose contract factories instead of raw seeds.

- The package now exports factories that return domain contracts: `createPublicWines(): WineContract[]` and `createDiscover(overrides?): DiscoverContract`. `createDiscover` composes the same `DiscoverContract` the backend serves; pass `{ wines }` to compose against real catalog data.
- Raw seed JSON and the old `createDiscoverHomeResponseFromSeeds` / per-fixture exports are no longer part of the public surface; seed data moved from `src/seeds` to private `src/data`.

Breaking: consumers replace `@edwardseshoka/fixtures` with `@edwardseshoka/samples` and switch from raw seeds to the factory functions.
