import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PlaceSuggestionDTOMapper } from "../../../dist/Data/index.js";
import {
  makePlaceSuggestion,
} from "../../../dist/Domain/TestDoubles/index.js";

describe("PlaceSuggestionDTOMapper", () => {
  it(
    "maps a suggestion entity into a suggestion DTO",
    function givenPlaceSuggestionEntity_whenMapped_thenReturnsSuggestionDTO() {
      // Given
      const mapper = new PlaceSuggestionDTOMapper();
      const suggestion = makePlaceSuggestion();

      // When
      const result = mapper.map(suggestion);

      // Then
      assert.equal(result.success, true);
      assert.deepEqual(result.data, suggestion);
      assert.equal(JSON.stringify(result.data), JSON.stringify(suggestion));
    },
  );
});
