import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { GetPlaceRequestDTOMapper } from "../../../dist/Data/index.js";

describe("GetPlaceRequestDTOMapper", () => {
  it(
    "maps a Places details input into its request DTO",
    function givenGetPlaceInput_whenMapped_thenReturnsDetailsRequestDTO() {
      // Given
      const mapper = new GetPlaceRequestDTOMapper();
      const input = {
        placeId: "place-id",
        sessionToken: "session-id",
        purpose: "address",
        languageCode: "fr",
        regionCode: "FR",
      };

      // When
      const result = mapper.map(input);

      // Then
      assert.deepEqual(result, input);
    },
  );
});
