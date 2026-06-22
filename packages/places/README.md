# @edwardseshoka/places

One cohesive Places module with explicit Domain and Data submodules.

- The package root and `@edwardseshoka/places/domain` expose entities, domain contracts, repository contracts, and use cases.
- `@edwardseshoka/places/data` exposes DTOs, model-specific mappers, `PlacesService`, and `PlacesDataRepository`.
- Domain and Data each provide their own test doubles through explicit subpaths.

Presentation and view models import only the package root or `/domain`.
Composition roots import `/data` to construct the service and repository at
the transport boundary.
