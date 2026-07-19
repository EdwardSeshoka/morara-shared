---
"@edwardseshoka/contracts": major
"@edwardseshoka/samples": major
---

Wine World Model + Fade Yield: evolve the shared contracts so the model understands wine globally and expresses the Fade Yield design — verdict words, provenance, trust bylines and member-note counts instead of public numeric scores.

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
