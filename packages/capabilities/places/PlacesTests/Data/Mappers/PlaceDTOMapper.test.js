import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PlaceDTOMapper } from "../../../dist/Data/index.js";
import { makePlace } from "../../../dist/Domain/TestDoubles/index.js";

describe("PlaceDTOMapper", () => {
  it(
    "maps a place entity into a serializable DTO",
    function givenPlaceEntity_whenMapped_thenReturnsSerializablePlaceDTO() {
      // Given
      const mapper = new PlaceDTOMapper();
      const place = makePlace();

      // When
      const result = mapper.map(place);

      // Then
      assert.equal(result.success, true);
      assert.equal(result.data.retrievedAt, "2026-06-23T10:15:30.000Z");
      assert.equal(
        JSON.parse(JSON.stringify(result.data)).retrievedAt,
        result.data.retrievedAt,
      );
    },
  );
});
