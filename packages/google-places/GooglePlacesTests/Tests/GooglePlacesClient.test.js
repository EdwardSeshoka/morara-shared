import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  GooglePlacesClient,
  GooglePlacesError,
} from "../../dist/index.js";
import { GooglePlacesFetchStub } from "../TestDoubles/GooglePlacesFetchStub.js";

describe("GooglePlacesClient.autocomplete", () => {
  it(
    "maps organization predictions",
    async function givenOrganizationPredictions_whenAutocompleteRuns_thenReturnsSuggestions() {
      // Given
      const fetchStub = new GooglePlacesFetchStub();
      fetchStub.returnJson({
        suggestions: [{
          placePrediction: {
            placeId: "estate-place-id",
            text: { text: "Kanonkop Wine Estate, Stellenbosch" },
            structuredFormat: {
              mainText: { text: "Kanonkop Wine Estate" },
              secondaryText: { text: "Stellenbosch" },
            },
            types: ["winery"],
          },
        }],
      });
      const client = createClient(fetchStub);

      // When
      const suggestions = await client.autocomplete({
        input: "Kanonkop",
        sessionToken: "session-one",
        purpose: "organization",
      });

      // Then
      assert.deepEqual(suggestions, [{
        placeId: "estate-place-id",
        text: "Kanonkop Wine Estate, Stellenbosch",
        primaryText: "Kanonkop Wine Estate",
        secondaryText: "Stellenbosch",
        types: ["winery"],
      }]);
      const requestBody = JSON.parse(fetchStub.requests[0].init.body);
      assert.equal(requestBody.input, "Kanonkop");
      assert.equal(requestBody.sessionToken, "session-one");
      assert.equal(requestBody.includedPrimaryTypes, undefined);
    },
  );

  it(
    "restricts address predictions to address place types",
    async function givenAddressSearch_whenAutocompleteRuns_thenRequestsAddressTypes() {
      // Given
      const fetchStub = new GooglePlacesFetchStub();
      const client = createClient(fetchStub);

      // When
      await client.autocomplete({
        input: "11 Cinema Street",
        sessionToken: "session-two",
        purpose: "address",
        includedRegionCodes: ["za"],
      });

      // Then
      const requestBody = JSON.parse(fetchStub.requests[0].init.body);
      assert.deepEqual(requestBody.includedPrimaryTypes, [
        "street_address",
        "premise",
        "subpremise",
      ]);
      assert.deepEqual(requestBody.includedRegionCodes, ["za"]);
    },
  );

  it(
    "does not call Google for empty input",
    async function givenEmptyInput_whenAutocompleteRuns_thenReturnsNoSuggestions() {
      // Given
      const fetchStub = new GooglePlacesFetchStub();
      const client = createClient(fetchStub);

      // When
      const suggestions = await client.autocomplete({
        input: " ",
        sessionToken: "session-three",
        purpose: "organization",
      });

      // Then
      assert.deepEqual(suggestions, []);
      assert.equal(fetchStub.requests.length, 0);
    },
  );
});

describe("GooglePlacesClient.getPlaceDetails", () => {
  it(
    "maps selected organization details",
    async function givenOrganizationDetails_whenRequested_thenReturnsNormalizedPlace() {
      // Given
      const fetchStub = new GooglePlacesFetchStub();
      fetchStub.returnJson({
        id: "estate-place-id",
        displayName: { text: "Kanonkop Wine Estate" },
        formattedAddress: "R44, Stellenbosch, South Africa",
        addressComponents: [{
          longText: "Stellenbosch",
          shortText: "Stellenbosch",
          types: ["locality"],
          languageCode: "en",
        }],
        location: { latitude: -33.9, longitude: 18.8 },
        primaryType: "winery",
        types: ["winery", "point_of_interest"],
        websiteUri: "https://example.com",
        businessStatus: "OPERATIONAL",
      });
      const client = createClient(fetchStub);

      // When
      const details = await client.getPlaceDetails({
        placeId: "estate-place-id",
        sessionToken: "session-four",
        purpose: "organization",
      });

      // Then
      assert.equal(details.placeId, "estate-place-id");
      assert.equal(details.displayName, "Kanonkop Wine Estate");
      assert.equal(details.formattedAddress, "R44, Stellenbosch, South Africa");
      assert.deepEqual(details.location, { latitude: -33.9, longitude: 18.8 });
      assert.equal(details.primaryType, "winery");
      assert.equal(
        details.retrievedAt.toISOString(),
        "2026-06-23T10:15:30.000Z",
      );
      assert.match(
        fetchStub.requests[0].input,
        /places\/estate-place-id\?sessionToken=session-four$/,
      );
    },
  );

  it(
    "throws a typed error when Google rejects the request",
    async function givenGoogleErrorResponse_whenDetailsRun_thenThrowsGooglePlacesError() {
      // Given
      const fetchStub = new GooglePlacesFetchStub();
      fetchStub.returnJson({ error: { message: "Invalid place." } }, 400);
      const client = createClient(fetchStub);

      // When
      const action = client.getPlaceDetails({
        placeId: "bad-place-id",
        sessionToken: "session-five",
        purpose: "address",
      });

      // Then
      await assert.rejects(action, (error) => {
        assert.equal(error instanceof GooglePlacesError, true);
        assert.equal(error.status, 400);
        return true;
      });
    },
  );
});

const createClient = (fetchStub) => {
  return new GooglePlacesClient({
    apiKey: "test-key",
    fetch: fetchStub.fetch,
    baseUrl: "https://places.test/v1",
    now: () => new Date("2026-06-23T10:15:30.000Z"),
  });
};
