import type { Mapper } from "@edwardseshoka/foundation";
import type { PlaceSuggestion } from "@edwardseshoka/places";

import { InvalidGooglePlaceResponseError } from "./GooglePlaceEntityMapper.js";

export class GooglePlaceSuggestionEntityMapper
  implements
    Mapper<
      GooglePlaceSuggestionResponseDTO,
      PlaceSuggestion,
      InvalidGooglePlaceResponseError
    >
{
  map(input: GooglePlaceSuggestionResponseDTO) {
    const text = input.text?.text;
    if (!input.placeId || !text) {
      return {
        success: false as const,
        error: new InvalidGooglePlaceResponseError(
          "Google place suggestion is missing placeId or text.",
        ),
      };
    }

    return {
      success: true as const,
      data: {
        placeId: input.placeId,
        text,
        primaryText: input.structuredFormat?.mainText?.text ?? text,
        secondaryText:
          input.structuredFormat?.secondaryText?.text ?? null,
        types: input.types ?? [],
      },
    };
  }
}

export type GooglePlaceSuggestionResponseDTO = {
  placeId?: string;
  text?: { text?: string };
  structuredFormat?: {
    mainText?: { text?: string };
    secondaryText?: { text?: string };
  };
  types?: string[];
};
