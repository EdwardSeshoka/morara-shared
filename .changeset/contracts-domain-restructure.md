---
"@edwardseshoka/contracts": major
---

Restructure contracts into per-domain subpaths and make discover a composition contract.

- New subpaths: `/catalog`, `/provenance`, `/editorial`, `/events`, `/social` (plus existing `/discover`, `/member`). `WineContract` and friends move from the package root to `/catalog` — the root now exports only `ApiResponse` and `PaginationContract`.
- `PaginationDTO` renamed to `PaginationContract`.
- Discover rewritten to the two-tier `DiscoverContract` (`{ hero, sections }`). The hero is a featured domain entity (`wine | region | editorial`) and sections carry domain-contract arrays. The old card and view-shaped hero types (`RegionCard`, `DiscoverWineHero`, `stats`, `ctas`, etc.) are removed — presentation now lives on the client.

Breaking: every import path changes. Consumers move `WineContract` to `@edwardseshoka/contracts/catalog`, replace `DiscoverHomeResponse`/cards with `DiscoverContract` + domain contracts, and rename `PaginationDTO`.
