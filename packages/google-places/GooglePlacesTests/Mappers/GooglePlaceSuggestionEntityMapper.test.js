import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  GooglePlaceSuggestionEntityMapper,
  InvalidGooglePlaceResponseError,
} from "../../dist/index.js";

describe("GooglePlaceSuggestionEntityMapper", () => {
  it(
    "maps a Google suggestion DTO into a place suggestion entity",
    function givenValidGoogleSuggestionDTO_whenMapped_thenReturnsSuggestionEntity() {
      // Given
      const mapper = new GooglePlaceSuggestionEntityMapper();
      const dto = {
        placeId: "estate-place-id",
        text: { text: "Kanonkop Wine Estate, Stellenbosch" },
        structuredFormat: {
          mainText: { text: "Kanonkop Wine Estate" },
          secondaryText: { text: "Stellenbosch" },
        },
        types: ["winery"],
      };

      // When
      const result = mapper.map(dto);

      // Then
      assert.equal(result.success, true);
      assert.deepEqual(result.data, {
        placeId: "estate-place-id",
        text: "Kanonkop Wine Estate, Stellenbosch",
        primaryText: "Kanonkop Wine Estate",
        secondaryText: "Stellenbosch",
        types: ["winery"],
      });
    },
  );

  it(
    "rejects a Google suggestion DTO without display text",
    function givenGoogleSuggestionDTOWithoutText_whenMapped_thenReturnsTypedFailure() {
      // Given
      const mapper = new GooglePlaceSuggestionEntityMapper();
      const dto = { placeId: "estate-place-id" };

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
