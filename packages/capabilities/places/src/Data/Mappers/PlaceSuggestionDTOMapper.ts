import type { Mapper } from "@edwardseshoka/foundation";

import type { PlaceSuggestionDTO } from "../DTOs/PlaceSuggestionDTO.js";
import type { PlaceSuggestion } from "../../Domain/Entities/PlaceSuggestion.js";

export class PlaceSuggestionDTOMapper
  implements Mapper<PlaceSuggestion, PlaceSuggestionDTO>
{
  map(input: PlaceSuggestion): PlaceSuggestionDTO {
    return {
      placeId: input.placeId,
      text: input.text,
      primaryText: input.primaryText,
      secondaryText: input.secondaryText,
      types: [...input.types],
    };
  }
}
