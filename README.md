# morara-shared

Shared internal TypeScript packages for Morara.

## Packages

- `@edwardseshoka/foundation` — common protocols and abstractions
- `@edwardseshoka/contracts` — DTOs and shared contracts
- `@edwardseshoka/fixtures` — shared seed/fixture JSON for API scenarios

## Versioning model

- Each package under `packages/*` remains a separate package with its own `package.json`.
- Releases are currently coordinated: all packages move together on the same version (`0.1.0` right now).
- Any internal dependency between workspace packages should use `workspace:*`.
- For coordinated bumps, use `npm run version:sync -- <new-version-or-semver-bump>` (for example `npm run version:sync -- 0.2.0` or `npm run version:sync -- patch`).
- Independent per-package versioning can be introduced later without changing package boundaries.
- Before merging to `main`, bump versions manually (root + all packages) as part of the PR.
- CI validates that all package versions are semver and aligned by running `npm run release:version:check`.

### Choosing patch, minor, major

- `patch` = bug fixes and non-breaking internal changes.
- `minor` = additive backward-compatible changes.
- `major` = breaking changes for consumers.

## Internal publishing

- Packages publish to GitHub Packages (`https://npm.pkg.github.com`) under the `@edwardseshoka/*` scope.
- GitHub Packages is used instead of public npmjs so shared packages stay internal and access is controlled via GitHub permissions.
- CI publishes only from `main` using the repository `GITHUB_TOKEN`; pull request workflows run validation only.
- On `main`, after checks pass, CI reads the coordinated version, publishes workspaces, and creates/pushes a matching git tag (for example `v0.2.0`).
- The release job avoids duplicate work where possible by skipping publish/tag when the tag already exists, and by detecting already-published versions.
- Consumers should configure npm scope routing:

```ini
registry=https://registry.npmjs.org/
@edwardseshoka:registry=https://npm.pkg.github.com
```

## Fixture organization

Fixtures are organized by API endpoint/use-case (for example `list-wines.json`, `featured-events.json`) rather than by entity tables or frontend view state. This keeps seed data response-like, domain-oriented, and reusable across backend seeding and frontend local doubles.

## Getting started

```bash
npm install
npm run build
npm run typecheck
```
