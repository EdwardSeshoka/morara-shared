import type { PlaceDTO } from "./PlaceDTO.js";
import type { PlaceSuggestionDTO } from "./PlaceSuggestionDTO.js";

export type SearchPlacesResponseDTO = {
  suggestions: PlaceSuggestionDTO[];
};

export type GetPlaceResponseDTO = {
  place: PlaceDTO;
};
