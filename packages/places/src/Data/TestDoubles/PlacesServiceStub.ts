import type {
  GetPlaceRequestDTO,
  GetPlaceResponseDTO,
  SearchPlacesRequestDTO,
  SearchPlacesResponseDTO,
} from "../DTOs/index.js";
import type { PlacesServiceInterface } from "../Services/PlacesService.js";
import { makePlaceDTO } from "./makePlaceDTO.js";
import { makePlaceSuggestionDTO } from "./makePlaceSuggestionDTO.js";

export class PlacesServiceStub implements PlacesServiceInterface {
  searchRequests: SearchPlacesRequestDTO[] = [];
  detailsRequests: GetPlaceRequestDTO[] = [];
  searchResponse: SearchPlacesResponseDTO = {
    suggestions: [makePlaceSuggestionDTO()],
  };
  detailsResponse: GetPlaceResponseDTO = {
    place: makePlaceDTO(),
  };

  async search(
    input: SearchPlacesRequestDTO,
  ): Promise<SearchPlacesResponseDTO> {
    this.searchRequests.push(input);
    return this.searchResponse;
  }

  async getDetails(
    input: GetPlaceRequestDTO,
  ): Promise<GetPlaceResponseDTO> {
    this.detailsRequests.push(input);
    return this.detailsResponse;
  }
}
