import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateSouthAfricanMobile } from "../../../dist/index.js";

describe("validateSouthAfricanMobile", () => {
  it(
    "accepts and normalizes a local South African mobile number",
    function givenValidLocalMobile_whenValidated_thenReturnsValidE164Number() {
      // Given
      const mobile = "082 123 4567";

      // When
      const result = validateSouthAfricanMobile(mobile);

      // Then
      assert.deepEqual(result, {
        valid: true,
        e164: "+27821234567",
      });
    },
  );

  it(
    "accepts and normalizes an international South African mobile number",
    function givenValidInternationalMobile_whenValidated_thenReturnsValidE164Number() {
      // Given
      const mobile = "+27 82 123 4567";

      // When
      const result = validateSouthAfricanMobile(mobile);

      // Then
      assert.deepEqual(result, {
        valid: true,
        e164: "+27821234567",
      });
    },
  );

  it(
    "accepts every supported South African mobile prefix",
    function givenSupportedMobilePrefixes_whenValidated_thenReturnsValidResults() {
      // Given
      const mobiles = ["062 123 4567", "072 123 4567", "082 123 4567"];

      // When
      const results = mobiles.map(validateSouthAfricanMobile);

      // Then
      assert.equal(results.every((result) => result.valid), true);
    },
  );

  it(
    "rejects a number with too few digits",
    function givenShortMobileNumber_whenValidated_thenReturnsInvalidWithoutE164Number() {
      // Given
      const mobile = "082 123 456";

      // When
      const result = validateSouthAfricanMobile(mobile);

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
      });
    },
  );

  it(
    "rejects a number with too many digits",
    function givenLongMobileNumber_whenValidated_thenReturnsInvalidWithoutE164Number() {
      // Given
      const mobile = "082 123 45678";

      // When
      const result = validateSouthAfricanMobile(mobile);

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
      });
    },
  );

  it(
    "rejects a correctly sized number with a non-mobile prefix",
    function givenUnsupportedMobilePrefix_whenValidated_thenReturnsInvalidResult() {
      // Given
      const mobile = "012 123 4567";

      // When
      const result = validateSouthAfricanMobile(mobile);

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: "+27121234567",
      });
    },
  );

  it(
    "rejects an empty number",
    function givenEmptyMobileNumber_whenValidated_thenReturnsInvalidWithoutE164Number() {
      // Given
      const mobile = "";

      // When
      const result = validateSouthAfricanMobile(mobile);

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
      });
    },
  );
});
