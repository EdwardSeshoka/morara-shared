import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  getPhoneCountries,
  isPhoneCountryCode,
} from "../../dist/index.js";

describe("getPhoneCountries", () => {
  it(
    "returns supported countries with their calling codes",
    function givenSupportedPhoneCountries_whenRequested_thenReturnsCountryCallingCodes() {
      // Given
      const expectedCountries = [
        { code: "FR", callingCode: "33" },
        { code: "US", callingCode: "1" },
        { code: "ZA", callingCode: "27" },
      ];

      // When
      const countries = getPhoneCountries();

      // Then
      for (const expectedCountry of expectedCountries) {
        assert.equal(
          countries.some(
            (country) =>
              country.code === expectedCountry.code &&
              country.callingCode === expectedCountry.callingCode,
          ),
          true,
        );
      }
    },
  );
});

describe("isPhoneCountryCode", () => {
  it(
    "recognizes a supported country code",
    function givenSupportedCountryCode_whenChecked_thenReturnsTrue() {
      // Given
      const countryCode = "FR";

      // When
      const result = isPhoneCountryCode(countryCode);

      // Then
      assert.equal(result, true);
    },
  );

  it(
    "rejects an unsupported country code",
    function givenUnsupportedCountryCode_whenChecked_thenReturnsFalse() {
      // Given
      const countryCode = "XX";

      // When
      const result = isPhoneCountryCode(countryCode);

      // Then
      assert.equal(result, false);
    },
  );
});
