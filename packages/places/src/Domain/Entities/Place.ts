export type PlaceLocation = {
  latitude: number;
  longitude: number;
};

export type PlaceAddressComponent = {
  longText: string;
  shortText: string;
  types: ReadonlyArray<string>;
  languageCode: string | null;
};

export type Place = {
  placeId: string;
  displayName: string | null;
  formattedAddress: string;
  addressComponents: ReadonlyArray<PlaceAddressComponent>;
  location: PlaceLocation | null;
  primaryType: string | null;
  types: ReadonlyArray<string>;
  websiteUri: string | null;
  businessStatus: string | null;
  retrievedAt: Date;
};
