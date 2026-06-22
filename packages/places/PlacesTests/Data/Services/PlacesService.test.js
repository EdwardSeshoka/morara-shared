import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PlacesService } from "../../../dist/Data/index.js";
import {
  makePlaceDTO,
  makePlaceSuggestionDTO,
  PlacesHTTPClientSpy,
} from "../../../dist/Data/TestDoubles/index.js";

describe("PlacesService", () => {
  it(
    "requests place suggestions from the Places endpoint",
    async function givenSearchRequest_whenSearchRuns_thenRequestsAutocompleteEndpoint() {
      // Given
      const client = new PlacesHTTPClientSpy();
      client.responseData = { suggestions: [makePlaceSuggestionDTO()] };
      const service = new PlacesService(client);
      const request = {
        input: "Maison",
        sessionToken: "session-id",
        purpose: "organization",
      };

      // When
      const response = await service.search(request);

      // Then
      assert.deepEqual(client.requests[0], {
        method: "POST",
        path: "/v1/places/autocomplete",
        body: request,
      });
      assert.equal(response.suggestions[0].placeId, "place-id");
    },
  );

  it(
    "requests place details from the Places endpoint",
    async function givenDetailsRequest_whenGetDetailsRuns_thenRequestsDetailsEndpoint() {
      // Given
      const client = new PlacesHTTPClientSpy();
      client.responseData = { place: makePlaceDTO() };
      const service = new PlacesService(client);
      const request = {
        placeId: "place-id",
        sessionToken: "session-id",
        purpose: "address",
      };

      // When
      const response = await service.getDetails(request);

      // Then
      assert.deepEqual(client.requests[0], {
        method: "POST",
        path: "/v1/places/details",
        body: request,
      });
      assert.equal(response.place.placeId, "place-id");
    },
  );
});
