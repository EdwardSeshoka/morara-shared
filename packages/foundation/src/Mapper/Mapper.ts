import type { Result } from "../Result.js";

/**
 * Nullable helper accepted by optional mapper helpers.
 *
 * @typeParam Input - Non-null source input type.
 */
export type Optional<Input> = Input | null | undefined;

/**
 * The result of {@link Mapper.map}. A non-failable mapper (`Failure = never`,
 * the default) returns its `Output` directly — no `Result` wrapper, no error to
 * handle. A failable mapper returns a `Result` the caller must handle.
 */
export type Mapped<Output, Failure extends Error> = [Failure] extends [never]
  ? Output
  : Result<Output, Failure>;

/**
 * Generic mapper contract for deterministic model transformations (DTO ⇄ domain,
 * database row ⇄ entity, entity ⇄ transport). Non-failable mappers simply return
 * their output; failable mappers report failure through the shared {@link Result}.
 *
 * @typeParam Input - Source value type.
 * @typeParam Output - Target value type.
 * @typeParam Failure - Mapping error type (`never` for non-failable mappers).
 *
 * @example Non-failable mapper — returns the output directly
 * ```ts
 * const toWineDto: Mapper<Wine, WineDto> = {
 *   map: (wine) => ({ id: wine.id, score: wine.rating }),
 * };
 * const dto = toWineDto.map(wine); // WineDto — no Result, no error handling
 * ```
 *
 * @example Failable mapper — returns a Result
 * ```ts
 * class InvalidWineError extends Error {}
 * const toWine: Mapper<WineDto, Wine, InvalidWineError> = {
 *   map(dto) {
 *     if (dto.score < 0) return { success: false, error: new InvalidWineError("bad score") };
 *     return { success: true, data: { id: dto.id, rating: dto.score } };
 *   },
 * };
 * ```
 */
export interface Mapper<Input, Output, Failure extends Error = never> {
  /**
   * Maps a source value into a target value. Returns the output directly for a
   * non-failable mapper, or a `Result` for a failable one.
   */
  map(input: Input): Mapped<Output, Failure>;
}

export namespace Mapper {
  /**
   * Unwraps a failable mapper's result, returning its output or throwing its
   * error. Non-failable mappers return their output from `map` directly and
   * don't need this.
   *
   * @example
   * ```ts
   * const record = Mapper.unwrap(WineItemToRecordMapper.map(item)); // throws on failure
   * const contract = WineToContractMapper.map(wine);                // non-failable, no unwrap
   * ```
   */
  export function unwrap<Output, Failure extends Error>(result: Result<Output, Failure>): Output {
    if (!result.success) {
      throw result.error;
    }
    return result.data;
  }
}
