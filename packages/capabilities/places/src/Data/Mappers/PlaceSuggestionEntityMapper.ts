import type { Mapper } from "@edwardseshoka/foundation";

import type { PlaceSuggestionDTO } from "../DTOs/PlaceSuggestionDTO.js";
import type { PlaceSuggestion } from "../../Domain/Entities/PlaceSuggestion.js";

export class PlaceSuggestionEntityMapper
  implements Mapper<PlaceSuggestionDTO, PlaceSuggestion>
{
  map(input: PlaceSuggestionDTO) {
    return {
      success: true as const,
      data: {
        placeId: input.placeId,
        text: input.text,
        primaryText: input.primaryText,
        secondaryText: input.secondaryText,
        types: [...input.types],
      },
    };
  }
}
