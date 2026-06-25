import type { Mapper } from "@edwardseshoka/foundation";

import type { SearchPlacesRequestDTO } from "../DTOs/PlacesRequestDTOs.js";
import type { SearchPlacesInput } from "../../Domain/Contracts/PlacesQueries.js";

export class SearchPlacesRequestDTOMapper
  implements Mapper<SearchPlacesInput, SearchPlacesRequestDTO>
{
  map(input: SearchPlacesInput) {
    return {
      success: true as const,
      data: {
        input: input.input,
        sessionToken: input.sessionToken,
        purpose: input.purpose,
        languageCode: input.languageCode,
        regionCode: input.regionCode,
        includedRegionCodes: input.includedRegionCodes
          ? [...input.includedRegionCodes]
          : undefined,
        locationBias: input.locationBias
          ? {
              center: {
                latitude: input.locationBias.center.latitude,
                longitude: input.locationBias.center.longitude,
              },
              radiusMeters: input.locationBias.radiusMeters,
            }
          : undefined,
      },
    };
  }
}
