import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { SearchPlacesRequestDTOMapper } from "../../../dist/Data/index.js";

describe("SearchPlacesRequestDTOMapper", () => {
  it(
    "maps a Places search input into its request DTO",
    function givenSearchPlacesInput_whenMapped_thenReturnsSearchRequestDTO() {
      // Given
      const mapper = new SearchPlacesRequestDTOMapper();
      const input = {
        input: "Maison du Vin",
        sessionToken: "session-id",
        purpose: "organization",
        languageCode: "fr",
        regionCode: "FR",
        includedRegionCodes: ["fr", "be"],
        locationBias: {
          center: { latitude: 48.8566, longitude: 2.3522 },
          radiusMeters: 25_000,
        },
      };

      // When
      const result = mapper.map(input);

      // Then
      assert.equal(result.success, true);
      assert.deepEqual(result.data, input);
    },
  );
});
