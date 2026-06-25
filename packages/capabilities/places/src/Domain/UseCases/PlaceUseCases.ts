import type {
  GetPlaceInput,
  SearchPlacesInput,
} from "../Contracts/PlacesQueries.js";
import type { PlacesRepository } from "../Contracts/PlacesRepository.js";
import type { Place } from "../Entities/Place.js";
import type { PlaceSuggestion } from "../Entities/PlaceSuggestion.js";

export interface SearchPlacesUseCaseInterface {
  execute(input: SearchPlacesInput): Promise<ReadonlyArray<PlaceSuggestion>>;
}

export interface GetPlaceDetailsUseCaseInterface {
  execute(input: GetPlaceInput): Promise<Place>;
}

export class SearchPlacesUseCase implements SearchPlacesUseCaseInterface {
  constructor(private readonly repository: PlacesRepository) {}

  execute(input: SearchPlacesInput): Promise<ReadonlyArray<PlaceSuggestion>> {
    return this.repository.search(input);
  }
}

export class GetPlaceDetailsUseCase
  implements GetPlaceDetailsUseCaseInterface
{
  constructor(private readonly repository: PlacesRepository) {}

  execute(input: GetPlaceInput): Promise<Place> {
    return this.repository.getDetails(input);
  }
}
