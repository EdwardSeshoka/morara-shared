import type { Mapper } from "@edwardseshoka/foundation";

import type { PlaceDTO } from "../DTOs/PlaceDTO.js";
import type { Place } from "../../Domain/Entities/Place.js";

export class InvalidPlaceDTOError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidPlaceDTOError";
  }
}

export class PlaceEntityMapper
  implements Mapper<PlaceDTO, Place, InvalidPlaceDTOError>
{
  map(input: PlaceDTO) {
    const retrievedAt = new Date(input.retrievedAt);
    if (Number.isNaN(retrievedAt.getTime())) {
      return {
        success: false as const,
        error: new InvalidPlaceDTOError(
          `Invalid retrievedAt value '${input.retrievedAt}'.`,
        ),
      };
    }

    return {
      success: true as const,
      data: {
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
        retrievedAt,
      },
    };
  }
}
