import type { PlaceSuggestion } from "../Entities/PlaceSuggestion.js";

export function makePlaceSuggestion(
  overrides: Partial<PlaceSuggestion> = {},
): PlaceSuggestion {
  return {
    placeId: "place-id",
    text: "Kanonkop Wine Estate, Stellenbosch",
    primaryText: "Kanonkop Wine Estate",
    secondaryText: "Stellenbosch",
    types: ["winery"],
    ...overrides,
  };
}
