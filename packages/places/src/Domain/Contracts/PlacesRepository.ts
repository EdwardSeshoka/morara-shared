import type { GetPlaceInput, SearchPlacesInput } from "./PlacesQueries.js";
import type { Place } from "../Entities/Place.js";
import type { PlaceSuggestion } from "../Entities/PlaceSuggestion.js";

export interface PlacesRepository {
  search(input: SearchPlacesInput): Promise<ReadonlyArray<PlaceSuggestion>>;
  getDetails(input: GetPlaceInput): Promise<Place>;
}
