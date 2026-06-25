import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { GooglePlacesRepository } from "../../dist/index.js";

describe("GooglePlacesRepository", () => {
  it(
    "delegates search requests to the Google Places client",
    async function givenSearchInput_whenSearchRuns_thenCallsAutocomplete() {
      // Given
      const client = new GooglePlacesClientSpy();
      const repository = new GooglePlacesRepository(client);
      const input = {
        input: "Kanonkop",
        sessionToken: "session-one",
        purpose: "organization",
      };

      // When
      const suggestions = await repository.search(input);

      // Then
      assert.deepEqual(suggestions, client.suggestions);
      assert.deepEqual(client.receivedAutocompleteInputs, [input]);
    },
  );

  it(
    "delegates details requests to the Google Places client",
    async function givenDetailsInput_whenGetDetailsRuns_thenCallsDetails() {
      // Given
      const client = new GooglePlacesClientSpy();
      const repository = new GooglePlacesRepository(client);
      const input = {
        placeId: "place-id",
        sessionToken: "session-two",
        purpose: "address",
      };

      // When
      const place = await repository.getDetails(input);

      // Then
      assert.deepEqual(place, client.place);
      assert.deepEqual(client.receivedDetailsInputs, [input]);
    },
  );
});

class GooglePlacesClientSpy {
  suggestions = [{
    placeId: "place-id",
    text: "Kanonkop Wine Estate",
    primaryText: "Kanonkop",
    secondaryText: "Stellenbosch",
    types: ["winery"],
  }];
  place = {
    placeId: "place-id",
    displayName: "Kanonkop Wine Estate",
    formattedAddress: "R44, Stellenbosch",
    addressComponents: [],
    location: null,
    primaryType: "winery",
    types: ["winery"],
    websiteUri: null,
    businessStatus: "OPERATIONAL",
    retrievedAt: new Date("2026-06-23T10:15:30.000Z"),
  };
  receivedAutocompleteInputs = [];
  receivedDetailsInputs = [];

  async autocomplete(input) {
    this.receivedAutocompleteInputs.push(input);
    return this.suggestions;
  }

  async getPlaceDetails(input) {
    this.receivedDetailsInputs.push(input);
    return this.place;
  }
}
