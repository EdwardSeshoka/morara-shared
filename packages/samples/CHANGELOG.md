# @edwardseshoka/fixtures

## 6.0.1

### Patch Changes

- 0188e1c: Fix discover curation refs that pointed at non-existent content. The
  `this_week_in_wine` (editorial) and `the_room` (room activity) sections referenced
  ids that don't exist in the editorial / social fixtures, so composing the discover
  response left those sections empty. Re-point them at the real fixture ids
  (`article_why_2018_stellenbosch` · `guide_field_guide_swartland_chenin` ·
  `article_decanting_how_long`; the three seeded activities), matching the ids the
  `discover-response.json` output fixture already uses.

## 6.0.0

### Major Changes

- e8c658f: Wine World Model + Fade Yield: evolve the shared contracts so the model understands wine globally and expresses the Fade Yield design — verdict words, provenance, trust bylines and member-note counts instead of public numeric scores.

  **Breaking — `contracts`**

  - Remove public numeric scores: `WineRatingContract`, `WineContract.rating`, `AddWineRequest.rating` and `ActivityContract.rating` are gone. Wines carry `verdict`, `provenance`, `source` and `noteCount` instead.
  - `VerdictWord` is a fixed 5-level ordinal scale: Unforgettable · Essential · Worth Revisiting · An Interesting Discovery · Not One I'd Revisit.
  - Three-tier catalog identity — `WineContract.id` is the **vintage** id, `wineLabelId` groups vintages; add `vintage` / `vintageDisplay`; `year` is now a deprecated optional alias.
  - Global origin — add `countryCode`, `appellation`, `color`, `grapeBlend` to wines; `RegionContract` hierarchy (`parentRegionId`, `regionType`, `countryCode`); new `AppellationContract`; `ProducerContract.countryCode`.
  - Unified trust vocabulary — `TrustTier` (professional · producer · distributor), `MemberStatus` (enthusiast → collector), `BusinessPersona` + `personaTier` mapping, and `MemberProfileType = MemberStatus | BusinessPersona` (renames "estate" → "producer"). New `TrustBylineContract`, `ProvenanceState`, `tierForProfile`.
  - Discover surfaces reshaped — `DiscoverSection` drops `regions`/`producers` in favour of `wines` (`WineContract[]`) and `doorways` (`DiscoverDoorwayContract` with a navigable `target`); adds `DiscoverWineHeroContract`, `WineActionContract`, `EditorialSubjectContract`/`EventSubjectContract` targeting, and `EventContract.host`. `WineListingContract` removed.
  - New `TastingNoteContract`, keyed to `wineVintageId` with distinct `tastedAt` / `createdAt`.

  **Breaking — `samples`**

  - Fixtures reshaped to the new contracts (no numeric `rating`), with global seeds (WO Stellenbosch · AOC Pauillac/Champagne · DOCG Barolo · Napa AVA, plus a non-vintage wine), new `appellations` and `tastingNotes` samples, and the discover fixture rebuilt to the Fade Yield funnel (editorial → wines → doorways → events → room).

### Patch Changes

- Updated dependencies [e8c658f]
  - @edwardseshoka/contracts@4.0.0

## 5.0.0

### Major Changes

- b2cb11d: Discover moves to backend-owned composition.

  - `createDiscover()` now returns a frozen canned `DiscoverContract` snapshot instead of composing one; the `wines` argument is removed. The app-double replays this fixture so the same production mapper runs.
  - Adds per-domain sample exports (`provenanceSamples`, `editorialSamples`, `eventsSamples`, `socialSamples`, and `discoverSamples` for curation) plus the `Curation` types, so each service has its own sample source. The backend composes the real response from this exact sample data; the fixture is a snapshot of that output, kept honest by a backend contract test.
  - Removes the internal `composeDiscover`/`curation` composition — composition logic lives in the backend, only the sample data is shared.

## 4.0.0

### Major Changes

- `createDiscover()` now returns a frozen canned `DiscoverContract` snapshot instead of composing one. The `wines` argument is removed — composition moved to the backend, and the app-double replays this fixture so the same production mapper runs. A backend contract test keeps the fixture in sync with the real composed response.

## 3.0.0

### Major Changes

- 2b1f9d9: Rename `@edwardseshoka/fixtures` to `@edwardseshoka/samples` and expose contract factories instead of raw seeds.

  - The package now exports factories that return domain contracts: `createPublicWines(): WineContract[]` and `createDiscover(overrides?): DiscoverContract`. `createDiscover` composes the same `DiscoverContract` the backend serves; pass `{ wines }` to compose against real catalog data.
  - Raw seed JSON and the old `createDiscoverHomeResponseFromSeeds` / per-fixture exports are no longer part of the public surface; seed data moved from `src/seeds` to private `src/data`.

  Breaking: consumers replace `@edwardseshoka/fixtures` with `@edwardseshoka/samples` and switch from raw seeds to the factory functions.

### Patch Changes

- Updated dependencies [2b1f9d9]
  - @edwardseshoka/contracts@3.0.0

## 2.0.0

### Major Changes

- 40a6a25: Fixtures Major Bump

## 1.2.2

### Patch Changes

- 6f63c3b: Packages Restructure Change Set
- Updated dependencies [6f63c3b]
  - @edwardseshoka/contracts@2.0.0

## 1.2.1

### Patch Changes

- 9c741ff: Fix the published fixtures package dependency on contracts so consumers install the published contracts package instead of looking for a local sibling folder.

## 1.2.0

### Minor Changes

- cc5799c: Add Discover Home and public Wines contracts, curation seeds, and seed-to-response mapping helpers.

## 1.1.0

### Minor Changes

- 7cfa663: Introduce publishing script

## 1.0.0

### Major Changes

- 030694a: Establish the first stable shared package releases.

  This promotes the shared contracts, fixtures, and foundation packages to the
  `1.x` line so app repositories can consume backward-compatible minor and patch
  updates with a semver range like `^1.0.0`, while future breaking changes remain
  manual app upgrades.

## 0.1.0

### Initial release

- Added the initial Morara shared fixtures and seed payloads package.
