# morara-shared

Shared internal TypeScript packages for Morara.

## Packages

- `@morara/foundation` — common protocols and abstractions
- `@morara/contracts` — DTOs and shared contracts
- `@morara/fixtures` — shared seed/fixture JSON for API scenarios

## Versioning model

- Each package under `packages/*` remains a separate package with its own `package.json`.
- Releases are currently coordinated: all packages move together on the same version (`0.1.0` right now).
- Any internal dependency between workspace packages should use `workspace:*`.
- For coordinated bumps, use `npm run version:sync -- <new-version-or-semver-bump>` (for example `npm run version:sync -- 0.2.0` or `npm run version:sync -- patch`).
- Independent per-package versioning can be introduced later without changing package boundaries.

## Fixture organization

Fixtures are organized by API endpoint/use-case (for example `list-wines.json`, `featured-events.json`) rather than by entity tables or frontend view state. This keeps seed data response-like, domain-oriented, and reusable across backend seeding and frontend local doubles.

## Getting started

```bash
npm install
npm run build
npm run typecheck
```
