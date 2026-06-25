import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { makePlace } from "../../../dist/Domain/TestDoubles/index.js";

describe("Place", () => {
  it(
    "uses the place ID as stable identity",
    function givenPlaceEntity_whenCreated_thenRetainsStablePlaceIdentity() {
      // Given
      const placeId = "google-place-id";

      // When
      const place = makePlace({ placeId });

      // Then
      assert.equal(place.placeId, placeId);
      assert.equal(place.retrievedAt instanceof Date, true);
    },
  );
});
