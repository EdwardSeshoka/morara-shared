# morara-shared

Shared internal TypeScript packages for Morara.

## Packages

- `@edwardseshoka/foundation` — common protocols and abstractions
- `@edwardseshoka/contracts` — DTOs and shared contracts
- `@edwardseshoka/fixtures` — shared seed/fixture JSON for API scenarios

## Versioning model

- Each package under `packages/*` remains a separate package with its own `package.json`.
- Any internal dependency between workspace packages should use `workspace:*`.
- Packages are versioned independently with Changesets.
- For every PR that changes a published package, run `npx changeset` and choose the correct bump type for each affected package.
- Merging to `main` updates or creates a `Version Packages` PR. Merging that PR publishes the updated package versions to GitHub Packages.
- Packages that did not change do not need a version bump.

### Choosing patch, minor, major

- `patch` = bug fixes and non-breaking internal changes.
- `minor` = additive backward-compatible changes.
- `major` = breaking changes for consumers.

## Internal publishing

- Packages publish to GitHub Packages (`https://npm.pkg.github.com`) under the `@edwardseshoka/*` scope.
- GitHub Packages is used instead of public npmjs so shared packages stay internal and access is controlled via GitHub permissions.
- CI publishes only from `main` using Changesets and the repository `GITHUB_TOKEN`; pull request workflows run validation only.
- The release workflow builds all workspaces before publishing, and each published package runs `prepack` so the published tarball contains compiled `dist` output.
- Consumers should configure npm scope routing:

```ini
registry=https://registry.npmjs.org/
@edwardseshoka:registry=https://npm.pkg.github.com
```

## Fixture organization

Fixtures are organized by API endpoint/use-case (for example `list-wines.json`, `featured-events.json`) rather than by entity tables or frontend view state. This keeps seed data response-like, domain-oriented, and reusable across backend seeding and frontend local doubles.

Morara-specific canonical dev/deploy seed data now also lives here:

- `packages/fixtures/src/seeds/morara/public-wines.json`

Consumer repos can sync from that file to keep backend deploy seeding and frontend local doubles aligned from one source of truth.

## Getting started

```bash
npm install
npm run build
npm run typecheck
```
