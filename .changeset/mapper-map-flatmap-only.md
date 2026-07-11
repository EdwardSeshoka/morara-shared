---
"@edwardseshoka/foundation": major
---

Trim `Mapper` to its core: `map` and `flatMap`.

`Mapper.map(input)` (the interface method) returns a `Result` — failures are returned, not thrown. `Mapper.flatMap(mapper, input)` returns the output directly for non-failable mappers (`Failure = never`, type-gated). Failable callers handle the returned `Result` themselves (`if (!result.success) throw result.error`), keeping the failure decision at the call site.

Breaking: the `map` (nullable overload), `mapOptional`, `mapOrThrow`, `flatMapOptional`, and `mapOptionalOrThrow` namespace helpers are removed.
