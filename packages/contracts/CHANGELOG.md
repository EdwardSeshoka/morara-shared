# @edwardseshoka/contracts

## 2.1.0

### Minor Changes

- d46851d: Add member profile contract under the `@edwardseshoka/contracts/member` subpath.

  Exposes `MemberContract`, `MemberProfileType`, `MemberContactMethod`,
  `SaveMemberProfileRequest`, `GetMemberProfileResponse`, and
  `SaveMemberProfileResponse` as the single source of truth for the
  `GET/POST /user/profile` endpoints, shared by the backend Lambda handlers and
  the frontend member-data layer (including the member repository app double).

## 2.0.0

### Major Changes

- 6f63c3b: Packages Restructure Change Set

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

- Added the initial Morara shared contracts package.
