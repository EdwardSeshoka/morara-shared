import type { Result } from "../Result.js";

/**
 * Generic mapper contract for deterministic model transformations (DTO ⇄ domain,
 * database row ⇄ entity, entity ⇄ transport).
 *
 * `map` always returns a {@link Result}: mapping failures are *returned*, never
 * thrown, so the caller decides what a failure means (throw, skip, fall back).
 * `Failure` is `never` for non-failable mappers.
 *
 * @typeParam Input - Source value type.
 * @typeParam Output - Target value type.
 * @typeParam Failure - Mapping error type (`never` for non-failable mappers).
 *
 * @example Non-failable — use `flatMap` for the output directly
 * ```ts
 * const toDto: Mapper<Wine, WineDto> = {
 *   map: (wine) => ({ success: true, data: { id: wine.id, score: wine.rating } }),
 * };
 * const dto = Mapper.flatMap(toDto, wine); // WineDto
 * ```
 *
 * @example Failable — handle the returned Result
 * ```ts
 * class InvalidWineError extends Error {}
 * const toWine: Mapper<WineDto, Wine, InvalidWineError> = {
 *   map(dto) {
 *     if (dto.score < 0) return { success: false, error: new InvalidWineError("bad score") };
 *     return { success: true, data: { id: dto.id, rating: dto.score } };
 *   },
 * };
 * const result = toWine.map(dto);
 * if (!result.success) throw result.error;   // caller's decision
 * ```
 */
export interface Mapper<Input, Output, Failure extends Error = never> {
  /**
   * Maps a source value into a target value, returning a `Result`. Failures are
   * returned in the result, not thrown.
   */
  map(input: Input): Result<Output, Failure>;
}

export namespace Mapper {
  /**
   * Returns a non-failable mapper's output directly. Available only when
   * `Failure = never`, so the type system guarantees there is no error to handle.
   */
  export function flatMap<Input, Output>(mapper: Mapper<Input, Output, never>, input: Input): Output {
    const result = mapper.map(input);
    if (!result.success) {
      throw new Error("Non-failable mapper returned failure.");
    }
    return result.data;
  }
}
