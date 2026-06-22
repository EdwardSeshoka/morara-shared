export type PlaceLocationDTO = {
  latitude: number;
  longitude: number;
};

export type PlaceAddressComponentDTO = {
  longText: string;
  shortText: string;
  types: string[];
  languageCode: string | null;
};

export type PlaceDTO = {
  placeId: string;
  displayName: string | null;
  formattedAddress: string;
  addressComponents: PlaceAddressComponentDTO[];
  location: PlaceLocationDTO | null;
  primaryType: string | null;
  types: string[];
  websiteUri: string | null;
  businessStatus: string | null;
  retrievedAt: string;
};
