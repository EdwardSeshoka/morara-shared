import type { PlaceLocation } from "../Entities/Place.js";

export type PlaceSearchPurpose = "organization" | "address";

export type PlaceLocationBias = {
  center: PlaceLocation;
  radiusMeters: number;
};

export type SearchPlacesInput = {
  input: string;
  sessionToken: string;
  purpose: PlaceSearchPurpose;
  languageCode?: string;
  regionCode?: string;
  includedRegionCodes?: ReadonlyArray<string>;
  locationBias?: PlaceLocationBias;
};

export type GetPlaceInput = {
  placeId: string;
  sessionToken: string;
  purpose: PlaceSearchPurpose;
  languageCode?: string;
  regionCode?: string;
};
