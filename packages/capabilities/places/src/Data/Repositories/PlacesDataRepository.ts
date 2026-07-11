import { Mapper } from "@edwardseshoka/foundation";

import {
  GetPlaceRequestDTOMapper,
  PlaceEntityMapper,
  PlaceSuggestionEntityMapper,
  SearchPlacesRequestDTOMapper,
} from "../Mappers/index.js";
import type { PlacesServiceInterface } from "../Services/PlacesService.js";
import type {
  GetPlaceInput,
  SearchPlacesInput,
} from "../../Domain/Contracts/PlacesQueries.js";
import type { PlacesRepository } from "../../Domain/Contracts/PlacesRepository.js";
import type { Place } from "../../Domain/Entities/Place.js";
import type { PlaceSuggestion } from "../../Domain/Entities/PlaceSuggestion.js";

export class PlacesDataRepository implements PlacesRepository {
  private readonly searchRequestMapper = new SearchPlacesRequestDTOMapper();
  private readonly detailsRequestMapper = new GetPlaceRequestDTOMapper();
  private readonly suggestionMapper = new PlaceSuggestionEntityMapper();
  private readonly placeMapper = new PlaceEntityMapper();

  constructor(private readonly service: PlacesServiceInterface) {}

  async search(
    input: SearchPlacesInput,
  ): Promise<ReadonlyArray<PlaceSuggestion>> {
    const request = this.searchRequestMapper.map(input);
    const response = await this.service.search(request);
    return response.suggestions.map((suggestion) =>
      this.suggestionMapper.map(suggestion),
    );
  }

  async getDetails(input: GetPlaceInput): Promise<Place> {
    const request = this.detailsRequestMapper.map(input);
    const response = await this.service.getDetails(request);
    return Mapper.unwrap(this.placeMapper.map(response.place));
  }
}
