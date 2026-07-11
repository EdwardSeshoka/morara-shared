import type { Mapper } from "@edwardseshoka/foundation";

import type { PlaceDTO } from "../DTOs/PlaceDTO.js";
import type { Place } from "../../Domain/Entities/Place.js";

export class PlaceDTOMapper implements Mapper<Place, PlaceDTO> {
  map(input: Place): PlaceDTO {
    return {
      placeId: input.placeId,
      displayName: input.displayName,
      formattedAddress: input.formattedAddress,
      addressComponents: input.addressComponents.map((component) => ({
        longText: component.longText,
        shortText: component.shortText,
        types: [...component.types],
        languageCode: component.languageCode,
      })),
      location: input.location
        ? {
            latitude: input.location.latitude,
            longitude: input.location.longitude,
          }
        : null,
      primaryType: input.primaryType,
      types: [...input.types],
      websiteUri: input.websiteUri,
      businessStatus: input.businessStatus,
      retrievedAt: input.retrievedAt.toISOString(),
    };
  }
}
