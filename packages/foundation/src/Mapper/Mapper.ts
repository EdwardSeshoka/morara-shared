import type { Result } from "../Result.js";

/**
 * Nullable helper accepted by optional mapper helpers.
 *
 * @typeParam Input - Non-null source input type.
 */
export type Optional<Input> = Input | null | undefined;

/**
 * Generic mapper contract for deterministic model transformations.
 *
 * Mappers convert one representation into another (for example DTO to domain,
 * database row to entity, or entity to transport model) while reporting success
 * through the shared {@link Result} union.
 *
 * @typeParam Input - Source value type.
 * @typeParam Output - Target value type.
 * @typeParam Failure - Mapping error type (`never` for non-failable mappers).
 *
 * @example Failable mapper
 * ```ts
 * type WineRecord = { id: string; rating: number };
 * type WineDto = { id: string; score: number };
 *
 * class InvalidWineRecordError extends Error {}
 *
 * const toWineDto: Mapper<WineRecord, WineDto, InvalidWineRecordError> = {
 *   map(input) {
 *     if (input.rating < 0) {
 *       return { success: false, error: new InvalidWineRecordError("Invalid rating") };
 *     }
 *
 *     return { success: true, data: { id: input.id, score: input.rating } };
 *   },
 * };
 * ```
 */
export interface Mapper<Input, Output, Failure extends Error = never> {
  /**
   * Maps a source value into a target value.
   *
   * @param input - Source value to transform.
   * @returns A `Result` containing either mapped data or a mapping error.
   */
  map(input: Input): Result<Output, Failure>;
}

export namespace Mapper {
  /**
   * Maps a non-null input value and returns a {@link Result}.
   *
   * @param mapper - Mapper implementation to execute.
   * @param input - Non-null source input.
   * @returns Mapping result.
   */
  export function map<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Input
  ): Result<Output, Failure>;
  export function map<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Optional<Input>
  ): Result<Output | null, Failure> {
    if (input == null) {
      return { success: true, data: null };
    }

    return mapper.map(input);
  }

  /**
   * Maps an optional input value.
   *
   * If `input` is `null` or `undefined`, this returns a successful result with
   * `data: null` and does not invoke the mapper.
   *
   * @param mapper - Mapper implementation to execute for non-null input.
   * @param input - Nullable/optional source input.
   * @returns `Result<Output | null, Failure>`.
   */
  export function mapOptional<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Optional<Input>
  ): Result<Output | null, Failure> {
    return map(mapper, input);
  }

  /**
   * Maps a value and throws when mapping fails.
   *
   * @param mapper - Mapper implementation to execute.
   * @param input - Source input value.
   * @returns The mapped value, or `null` for nullish optional input.
   * @throws `Failure` when mapping returns `{ success: false }`.
   *
   * @example
   * ```ts
   * const dto = Mapper.mapOrThrow(toWineDto, { id: "wine_123", rating: 95 });
   * ```
   */
  export function mapOrThrow<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Input
  ): Output;
  export function mapOrThrow<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Optional<Input>
  ): Output | null;
  export function mapOrThrow<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Optional<Input>
  ): Output | null {
    const result = map(mapper, input);

    if (!result.success) {
      throw result.error;
    }

    return result.data;
  }

  /**
   * Maps a value with a non-failable mapper and returns the mapped output directly.
   *
   * This is a convenience for `Mapper<Input, Output, never>` implementations.
   *
   * @param mapper - Mapper guaranteed to never fail.
   * @param input - Source input value.
   * @returns The mapped value, or `null` for nullish optional input.
   * @throws Error if a non-failable mapper unexpectedly returns failure.
   */
  export function flatMap<Input, Output>(
    mapper: Mapper<Input, Output, never>,
    input: Input
  ): Output;
  export function flatMap<Input, Output>(
    mapper: Mapper<Input, Output, never>,
    input: Optional<Input>
  ): Output | null {
    if (input == null) {
      return null;
    }

    const result = mapper.map(input);

    if (!result.success) {
      throw new Error("Non-failable mapper returned failure.");
    }

    return result.data;
  }

  /**
   * Optional-input variant of {@link flatMap}.
   *
   * @param mapper - Mapper guaranteed to never fail.
   * @param input - Nullable/optional source input.
   * @returns The mapped value or `null` for nullish input.
   */
  export function flatMapOptional<Input, Output>(
    mapper: Mapper<Input, Output, never>,
    input: Optional<Input>
  ): Output | null {
    return flatMap(mapper, input);
  }

  /**
   * Optional-input variant of {@link mapOrThrow}.
   *
   * @param mapper - Mapper implementation to execute.
   * @param input - Nullable/optional source input.
   * @returns The mapped value or `null` for nullish input.
   * @throws `Failure` when mapping fails for non-null input.
   */
  export function mapOptionalOrThrow<Input, Output, Failure extends Error>(
    mapper: Mapper<Input, Output, Failure>,
    input: Optional<Input>
  ): Output | null {
    return mapOrThrow(mapper, input);
  }
}
