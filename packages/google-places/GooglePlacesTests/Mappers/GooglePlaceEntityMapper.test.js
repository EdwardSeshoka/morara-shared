import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  GooglePlaceEntityMapper,
  InvalidGooglePlaceResponseError,
} from "../../dist/index.js";

describe("GooglePlaceEntityMapper", () => {
  it(
    "maps a Google place DTO into a place entity",
    function givenValidGooglePlaceDTO_whenMapped_thenReturnsPlaceEntity() {
      // Given
      const retrievedAt = new Date("2026-06-23T10:15:30.000Z");
      const mapper = new GooglePlaceEntityMapper(() => retrievedAt);
      const dto = {
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
      };

      // When
      const result = mapper.map(dto);

      // Then
      assert.equal(result.success, true);
      assert.equal(result.data.placeId, "estate-place-id");
      assert.equal(result.data.displayName, "Kanonkop Wine Estate");
      assert.equal(result.data.retrievedAt, retrievedAt);
    },
  );

  it(
    "rejects a Google place DTO without an ID",
    function givenGooglePlaceDTOWithoutID_whenMapped_thenReturnsTypedFailure() {
      // Given
      const mapper = new GooglePlaceEntityMapper(() => new Date());
      const dto = { formattedAddress: "R44, Stellenbosch, South Africa" };

      // When
      const result = mapper.map(dto);

      // Then
      assert.equal(result.success, false);
      assert.equal(
        result.error instanceof InvalidGooglePlaceResponseError,
        true,
      );
    },
  );
});
