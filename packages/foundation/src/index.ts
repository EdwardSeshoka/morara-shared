export * from "./UseCases/index.js";
export * from "./Mapper/index.js";
export * from "./Result.js";

export interface AsyncUseCase<Input, Output> {
  execute(input: Input): Promise<Output>;
}

export interface SyncUseCase<Input, Output> {
  execute(input: Input): Output;
}
