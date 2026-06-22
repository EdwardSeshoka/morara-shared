import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { PlacesDataRepository } from "../../../dist/Data/index.js";
import { PlacesServiceStub } from "../../../dist/Data/TestDoubles/index.js";

describe("PlacesDataRepository", () => {
  it(
    "maps search inputs and DTO responses",
    async function givenSearchInput_whenRepositorySearches_thenReturnsSuggestionEntities() {
      // Given
      const service = new PlacesServiceStub();
      const repository = new PlacesDataRepository(service);

      // When
      const suggestions = await repository.search({
        input: "Maison",
        sessionToken: "session-id",
        purpose: "organization",
        regionCode: "FR",
      });

      // Then
      assert.equal(service.searchRequests[0].regionCode, "FR");
      assert.equal(suggestions[0].placeId, "place-id");
    },
  );

  it(
    "maps details inputs and DTO responses",
    async function givenDetailsInput_whenRepositoryLoadsDetails_thenReturnsPlaceEntity() {
      // Given
      const service = new PlacesServiceStub();
      const repository = new PlacesDataRepository(service);

      // When
      const place = await repository.getDetails({
        placeId: "place-id",
        sessionToken: "session-id",
        purpose: "address",
      });

      // Then
      assert.equal(service.detailsRequests[0].placeId, "place-id");
      assert.equal(place.placeId, "place-id");
      assert.equal(place.retrievedAt instanceof Date, true);
    },
  );
});
