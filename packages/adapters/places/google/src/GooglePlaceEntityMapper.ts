import type { Mapper } from "@edwardseshoka/foundation";
import type { Place, PlaceAddressComponent } from "@edwardseshoka/places";

export class GooglePlaceEntityMapper
  implements
    Mapper<
      GooglePlaceResponseDTO,
      Place,
      InvalidGooglePlaceResponseError
    >
{
  constructor(private readonly now: () => Date) {}

  map(input: GooglePlaceResponseDTO) {
    if (!input.id) {
      return {
        success: false as const,
        error: new InvalidGooglePlaceResponseError(
          "Google place response is missing its ID.",
        ),
      };
    }

    return {
      success: true as const,
      data: {
        placeId: input.id,
        displayName: input.displayName?.text ?? null,
        formattedAddress: input.formattedAddress ?? "",
        addressComponents: (input.addressComponents ?? []).map(
          mapAddressComponent,
        ),
        location: input.location ?? null,
        primaryType: input.primaryType ?? null,
        types: input.types ?? [],
        websiteUri: input.websiteUri ?? null,
        businessStatus: input.businessStatus ?? null,
        retrievedAt: this.now(),
      },
    };
  }
}

export class InvalidGooglePlaceResponseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidGooglePlaceResponseError";
  }
}

function mapAddressComponent(
  component: GoogleAddressComponentDTO,
): PlaceAddressComponent {
  return {
    longText: component.longText ?? "",
    shortText: component.shortText ?? "",
    types: component.types ?? [],
    languageCode: component.languageCode ?? null,
  };
}

export type GoogleAddressComponentDTO = {
  longText?: string;
  shortText?: string;
  types?: string[];
  languageCode?: string;
};

export type GooglePlaceResponseDTO = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  addressComponents?: GoogleAddressComponentDTO[];
  location?: { latitude: number; longitude: number };
  primaryType?: string;
  types?: string[];
  websiteUri?: string;
  businessStatus?: string;
};
