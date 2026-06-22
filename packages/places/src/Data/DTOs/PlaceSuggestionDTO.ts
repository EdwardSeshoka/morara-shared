export type PlaceSuggestionDTO = {
  placeId: string;
  text: string;
  primaryText: string;
  secondaryText: string | null;
  types: string[];
};
