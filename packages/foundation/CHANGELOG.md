# @edwardseshoka/foundation

## 2.0.0

### Major Changes

- a5a8dd3: `Mapper.map` now returns the output directly for non-failable mappers.

  A `Mapper<Input, Output>` (the default `Failure = never`) returns `Output` from `map`, with no `Result` wrapper and nothing to unwrap; a failable `Mapper<Input, Output, SomeError>` still returns `Result<Output, SomeError>`. `Mapper.mapOrThrow(mapper, input)` continues to return `Output` uniformly for both.

  Breaking: non-failable mapper implementations return their output directly instead of `{ success: true, data }`, and the `map` / `mapOptional` / `flatMap` / `flatMapOptional` / `mapOptionalOrThrow` namespace helpers are removed (call `.map()` directly, or `mapOrThrow`).

## 1.2.1

### Patch Changes

- 6f63c3b: Packages Restructure Change Set

## 1.2.0

### Minor Changes

- 77e85e5: Add dependency-free shared email validation.

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

- Added the initial Morara shared foundation utilities package.
