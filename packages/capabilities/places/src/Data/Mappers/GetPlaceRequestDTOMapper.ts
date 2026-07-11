import type { Mapper } from "@edwardseshoka/foundation";

import type { GetPlaceRequestDTO } from "../DTOs/PlacesRequestDTOs.js";
import type { GetPlaceInput } from "../../Domain/Contracts/PlacesQueries.js";

export class GetPlaceRequestDTOMapper
  implements Mapper<GetPlaceInput, GetPlaceRequestDTO>
{
  map(input: GetPlaceInput): GetPlaceRequestDTO {
    return {
      placeId: input.placeId,
      sessionToken: input.sessionToken,
      purpose: input.purpose,
      languageCode: input.languageCode,
      regionCode: input.regionCode,
    };
  }
}
