import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateMobileNumber } from "../../dist/index.js";

describe("validateMobileNumber", () => {
  it(
    "accepts and normalizes a French national mobile number",
    function givenFrenchNationalMobile_whenValidated_thenReturnsFrenchE164Number() {
      // Given
      const mobile = "06 12 34 56 78";

      // When
      const result = validateMobileNumber(mobile, "FR");

      // Then
      assert.deepEqual(result, {
        valid: true,
        e164: "+33612345678",
        countryCode: "FR",
        countryCallingCode: "33",
        failure: null,
      });
    },
  );

  it(
    "accepts and normalizes a South African national mobile number",
    function givenSouthAfricanNationalMobile_whenValidated_thenReturnsSouthAfricanE164Number() {
      // Given
      const mobile = "082 123 4567";

      // When
      const result = validateMobileNumber(mobile, "ZA");

      // Then
      assert.deepEqual(result, {
        valid: true,
        e164: "+27821234567",
        countryCode: "ZA",
        countryCallingCode: "27",
        failure: null,
      });
    },
  );

  it(
    "accepts and normalizes a United States national mobile number",
    function givenUnitedStatesNationalMobile_whenValidated_thenReturnsUnitedStatesE164Number() {
      // Given
      const mobile = "202-555-0123";

      // When
      const result = validateMobileNumber(mobile, "US");

      // Then
      assert.deepEqual(result, {
        valid: true,
        e164: "+12025550123",
        countryCode: "US",
        countryCallingCode: "1",
        failure: null,
      });
    },
  );

  it(
    "accepts an international mobile number without a selected country",
    function givenInternationalMobileWithoutCountry_whenValidated_thenInfersCountry() {
      // Given
      const mobile = "+33 6 12 34 56 78";

      // When
      const result = validateMobileNumber(mobile);

      // Then
      assert.deepEqual(result, {
        valid: true,
        e164: "+33612345678",
        countryCode: "FR",
        countryCallingCode: "33",
        failure: null,
      });
    },
  );

  it(
    "rejects a national number without a selected country",
    function givenNationalMobileWithoutCountry_whenValidated_thenReturnsCountryRequiredFailure() {
      // Given
      const mobile = "06 12 34 56 78";

      // When
      const result = validateMobileNumber(mobile);

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
        countryCode: null,
        countryCallingCode: null,
        failure: "countryRequired",
      });
    },
  );

  it(
    "rejects a number for an unsupported country code",
    function givenUnsupportedCountryCode_whenValidated_thenReturnsUnsupportedCountryFailure() {
      // Given
      const mobile = "123456789";

      // When
      const result = validateMobileNumber(mobile, "XX");

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
        countryCode: null,
        countryCallingCode: null,
        failure: "unsupportedCountry",
      });
    },
  );

  it(
    "rejects a fixed-line number",
    function givenFrenchFixedLineNumber_whenValidated_thenReturnsInvalidNumberFailure() {
      // Given
      const mobile = "01 45 45 32 45";

      // When
      const result = validateMobileNumber(mobile, "FR");

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
        countryCode: null,
        countryCallingCode: null,
        failure: "invalidNumber",
      });
    },
  );

  it(
    "rejects an empty number",
    function givenEmptyMobileNumber_whenValidated_thenReturnsEmptyFailure() {
      // Given
      const mobile = "";

      // When
      const result = validateMobileNumber(mobile, "FR");

      // Then
      assert.deepEqual(result, {
        valid: false,
        e164: null,
        countryCode: null,
        countryCallingCode: null,
        failure: "empty",
      });
    },
  );
});
