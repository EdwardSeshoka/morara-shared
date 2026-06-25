import type { PlaceSuggestionDTO } from "../DTOs/PlaceSuggestionDTO.js";

export function makePlaceSuggestionDTO(
  overrides: Partial<PlaceSuggestionDTO> = {},
): PlaceSuggestionDTO {
  return {
    placeId: "place-id",
    text: "Kanonkop Wine Estate, Stellenbosch",
    primaryText: "Kanonkop Wine Estate",
    secondaryText: "Stellenbosch",
    types: ["winery"],
    ...overrides,
  };
}
