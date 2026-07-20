---
"@edwardseshoka/samples": patch
---

Seed doorway card images. The four discover `doorway_cards` — The Swartland
Table, The Meerlust Cellar, Cape Bordeaux and Barolo DOCG — now carry an
`imageUrl` in both the `discover-response.json` and `curation.json` fixtures, so
the "Find your way in" browse cards render photography instead of falling back to
the mesh placeholder. Data-only; the `DiscoverDoorwayContract` already declared
`imageUrl` as optional.
