export type PlaceSearchPurposeDTO = "organization" | "address";

export type PlaceLocationBiasDTO = {
  center: {
    latitude: number;
    longitude: number;
  };
  radiusMeters: number;
};

export type SearchPlacesRequestDTO = {
  input: string;
  sessionToken: string;
  purpose: PlaceSearchPurposeDTO;
  languageCode?: string;
  regionCode?: string;
  includedRegionCodes?: string[];
  locationBias?: PlaceLocationBiasDTO;
};

export type GetPlaceRequestDTO = {
  placeId: string;
  sessionToken: string;
  purpose: PlaceSearchPurposeDTO;
  languageCode?: string;
  regionCode?: string;
};
