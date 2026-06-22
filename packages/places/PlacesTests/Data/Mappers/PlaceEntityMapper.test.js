import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  InvalidPlaceDTOError,
  PlaceEntityMapper,
} from "../../../dist/Data/index.js";
import { makePlaceDTO } from "../../../dist/Data/TestDoubles/index.js";

describe("PlaceEntityMapper", () => {
  it(
    "maps a place DTO into a place entity",
    function givenValidPlaceDTO_whenMapped_thenReturnsPlaceEntity() {
      // Given
      const mapper = new PlaceEntityMapper();
      const dto = makePlaceDTO();

      // When
      const result = mapper.map(dto);

      // Then
      assert.equal(result.success, true);
      assert.equal(result.data.retrievedAt instanceof Date, true);
      assert.equal(
        result.data.retrievedAt.toISOString(),
        "2026-06-23T10:15:30.000Z",
      );
    },
  );

  it(
    "rejects an invalid place DTO timestamp",
    function givenInvalidPlaceDTODate_whenMapped_thenReturnsTypedFailure() {
      // Given
      const mapper = new PlaceEntityMapper();
      const dto = makePlaceDTO({ retrievedAt: "not-a-date" });

      // When
      const result = mapper.map(dto);

      // Then
      assert.equal(result.success, false);
      assert.equal(result.error instanceof InvalidPlaceDTOError, true);
    },
  );
});
