import type { Place } from "../Entities/Place.js";

export function makePlace(overrides: Partial<Place> = {}): Place {
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
    retrievedAt: new Date("2026-06-23T10:15:30.000Z"),
    ...overrides,
  };
}
