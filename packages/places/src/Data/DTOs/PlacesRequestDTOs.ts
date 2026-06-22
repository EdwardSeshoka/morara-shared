export type PlaceSearchPurposeDTO = "organization" | "address";

export type SearchPlacesRequestDTO = {
  input: string;
  sessionToken: string;
  purpose: PlaceSearchPurposeDTO;
  languageCode?: string;
  regionCode?: string;
};

export type GetPlaceRequestDTO = {
  placeId: string;
  sessionToken: string;
  purpose: PlaceSearchPurposeDTO;
  languageCode?: string;
  regionCode?: string;
};
