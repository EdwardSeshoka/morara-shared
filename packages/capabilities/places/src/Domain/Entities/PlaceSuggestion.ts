export type PlaceSuggestion = {
  placeId: string;
  text: string;
  primaryText: string;
  secondaryText: string | null;
  types: ReadonlyArray<string>;
};
