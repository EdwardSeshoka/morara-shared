import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PlaceSuggestionEntityMapper } from "../../../dist/Data/index.js";
import {
  makePlaceSuggestionDTO,
} from "../../../dist/Data/TestDoubles/index.js";

describe("PlaceSuggestionEntityMapper", () => {
  it(
    "maps a suggestion DTO into a suggestion entity",
    function givenPlaceSuggestionDTO_whenMapped_thenReturnsSuggestionEntity() {
      // Given
      const mapper = new PlaceSuggestionEntityMapper();
      const dto = makePlaceSuggestionDTO();

      // When
      const result = mapper.map(dto);

      // Then
      assert.equal(result.success, true);
      assert.deepEqual(result.data, dto);
      assert.notEqual(result.data.types, dto.types);
    },
  );
});
