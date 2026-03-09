/**
 * Asynchronous application use case contract.
 *
 * Use this interface for command-style (action) and query-style (read) workflows.
 * The `Failure` type parameter documents the expected error boundary for callers.
 *
 * @typeParam Input - Request payload required by the use case. Use `void` for no input.
 * @typeParam Output - Successful response payload produced by the use case.
 * @typeParam Failure - Expected error type surfaced by the use case (`never` if not modeled).
 *
 * @remarks
 * TypeScript has no runtime-enforced typed throws. `Failure` is therefore a design-time
 * contract for documentation, API discoverability, and composition safety.
 *
 * @example Query use case with explicit input
 * ```ts
 * interface GetWineByIdInput {
 *   wineId: string;
 * }
 *
 * interface WineDto {
 *   id: string;
 *   name: string;
 * }
 *
 * class WineNotFoundError extends Error {}
 *
 * class GetWineByIdUseCase
 *   implements UseCase<GetWineByIdInput, WineDto, WineNotFoundError>
 * {
 *   async execute(input: GetWineByIdInput): Promise<WineDto> {
 *     // Query implementation.
 *     return { id: input.wineId, name: "Cabernet Sauvignon" };
 *   }
 * }
 *
 * const useCase = new GetWineByIdUseCase();
 * const wine = await useCase.execute({ wineId: "wine_123" });
 * ```
 *
 * @example Action use case with no input
 * ```ts
 * class RefreshCatalogUseCase implements NoInputUseCase<void, Error> {
 *   async execute(): Promise<void> {
 *     // Side-effect implementation.
 *   }
 * }
 *
 * await new RefreshCatalogUseCase().execute();
 * ```
 */
export interface UseCase<Input = void, Output = void, Failure extends Error = never> {
  /**
   * Executes the use case.
   *
   * Call signatures are inferred from {@link UseCaseArgs}:
   * - `Input = void` -> `execute()` or `execute(undefined)`
   * - non-void input -> `execute(input)`
   *
   * @param args - Optional or required argument tuple derived from `Input`.
   * @returns A promise of the successful use case output.
   */
  execute(...args: UseCaseArgs<Input>): Promise<Output>;
}

/**
 * Compile-time argument tuple used by {@link UseCase.execute}.
 *
 * Mirrors the Swift convenience of `Input == Void` by allowing calls without
 * parameters when `Input` is `void`.
 *
 * @typeParam Input - The `UseCase` input type.
 *
 * @example
 * ```ts
 * type WithInput = UseCaseArgs<{ id: string }>;
 * //    ^? [input: { id: string }]
 *
 * type WithoutInput = UseCaseArgs<void>;
 * //    ^? [] | [input: void]
 * ```
 */
export type UseCaseArgs<Input> =
  [Input] extends [void] ? [] | [input: Input] : [input: Input];

/**
 * Shorthand alias for use cases that do not require explicit input.
 *
 * @typeParam Output - Successful response payload produced by the use case.
 * @typeParam Failure - Expected error type surfaced by the use case.
 */
export type NoInputUseCase<Output = void, Failure extends Error = never> =
  UseCase<void, Output, Failure>;

/**
 * Extracts the input type from a {@link UseCase}.
 *
 * @typeParam TUseCase - Any `UseCase` implementation.
 */
export type UseCaseInput<TUseCase extends UseCase<any, any, any>> =
  TUseCase extends UseCase<infer Input, any, any> ? Input : never;

/**
 * Extracts the successful output type from a {@link UseCase}.
 *
 * @typeParam TUseCase - Any `UseCase` implementation.
 */
export type UseCaseOutput<TUseCase extends UseCase<any, any, any>> =
  TUseCase extends UseCase<any, infer Output, any> ? Output : never;

/**
 * Extracts the declared failure type from a {@link UseCase}.
 *
 * @typeParam TUseCase - Any `UseCase` implementation.
 */
export type UseCaseFailure<TUseCase extends UseCase<any, any, any>> =
  TUseCase extends UseCase<any, any, infer Failure> ? Failure : never;
