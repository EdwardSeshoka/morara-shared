export type GooglePlacesSearchPurpose = "organization" | "address";

export type GooglePlacesLocation = {
  latitude: number;
  longitude: number;
};

export type GooglePlacesLocationBias = {
  center: GooglePlacesLocation;
  radiusMeters: number;
};

export type GooglePlacesAutocompleteRequest = {
  input: string;
  sessionToken: string;
  purpose: GooglePlacesSearchPurpose;
  languageCode?: string;
  regionCode?: string;
  includedRegionCodes?: ReadonlyArray<string>;
  locationBias?: GooglePlacesLocationBias;
};

export type GooglePlaceSuggestion = {
  placeId: string;
  text: string;
  primaryText: string;
  secondaryText: string | null;
  types: ReadonlyArray<string>;
};

export type GooglePlaceAddressComponent = {
  longText: string;
  shortText: string;
  types: ReadonlyArray<string>;
  languageCode: string | null;
};

export type GooglePlaceDetailsRequest = {
  placeId: string;
  sessionToken: string;
  purpose: GooglePlacesSearchPurpose;
  languageCode?: string;
  regionCode?: string;
};

export type GooglePlaceDetails = {
  placeId: string;
  displayName: string | null;
  formattedAddress: string;
  addressComponents: ReadonlyArray<GooglePlaceAddressComponent>;
  location: GooglePlacesLocation | null;
  primaryType: string | null;
  types: ReadonlyArray<string>;
  websiteUri: string | null;
  businessStatus: string | null;
};

export type GooglePlacesFetch = (
  input: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export type GooglePlacesClientConfiguration = {
  apiKey: string;
  fetch?: GooglePlacesFetch;
  baseUrl?: string;
};
