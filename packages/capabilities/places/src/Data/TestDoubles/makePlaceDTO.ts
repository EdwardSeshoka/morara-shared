import type { PlaceDTO } from "../DTOs/PlaceDTO.js";

export function makePlaceDTO(overrides: Partial<PlaceDTO> = {}): PlaceDTO {
  return {
    placeId: "place-id",
    displayName: "Kanonkop Wine Estate",
    formattedAddress: "R44, Stellenbosch, South Africa",
    addressComponents: [],
    location: { latitude: -33.9, longitude: 18.8 },
    primaryType: "winery",
    types: ["winery"],
    websiteUri: null,
    businessStatus: "OPERATIONAL",
    retrievedAt: "2026-06-23T10:15:30.000Z",
    ...overrides,
  };
}
