# @edwardseshoka/places

One cohesive Places module with explicit Domain and Data submodules.

- The package root and `@edwardseshoka/places/domain` expose entities and domain contracts.
- `@edwardseshoka/places/data` exposes DTOs and model-specific mappers.
- Domain and Data each provide their own test doubles through explicit subpaths.

Presentation, view models, and use cases import only the package root or
`/domain`. Services and repositories may import `/data` at transport
boundaries.
