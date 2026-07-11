---
"@edwardseshoka/foundation": major
---

`Mapper.map` now returns the output directly for non-failable mappers.

A `Mapper<Input, Output>` (the default `Failure = never`) returns `Output` from `map`, with no `Result` wrapper and nothing to unwrap; a failable `Mapper<Input, Output, SomeError>` still returns `Result<Output, SomeError>`. `Mapper.mapOrThrow(mapper, input)` continues to return `Output` uniformly for both.

Breaking: non-failable mapper implementations return their output directly instead of `{ success: true, data }`, and the `map` / `mapOptional` / `flatMap` / `flatMapOptional` / `mapOptionalOrThrow` namespace helpers are removed (call `.map()` directly, or `mapOrThrow`).
