import type {
  GetPlaceInput,
  Place,
  PlacesRepository,
  PlaceSuggestion,
  SearchPlacesInput,
} from "@edwardseshoka/places";

import type { GooglePlacesClient } from "./GooglePlacesClient.js";

export class GooglePlacesRepository implements PlacesRepository {
  constructor(private readonly client: GooglePlacesClient) {}

  search(input: SearchPlacesInput): Promise<ReadonlyArray<PlaceSuggestion>> {
    return this.client.autocomplete(input);
  }

  getDetails(input: GetPlaceInput): Promise<Place> {
    return this.client.getPlaceDetails(input);
  }
}
