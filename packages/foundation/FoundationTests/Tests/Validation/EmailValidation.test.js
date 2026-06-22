import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { validateEmail } from "../../../dist/index.js";

describe("validateEmail", () => {
  it(
    "returns true for a conventional email address",
    function givenConventionalEmail_whenValidated_thenReturnsTrue() {
      // Given
      const email = "person@example.com";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, true);
    },
  );

  it(
    "returns true when the email has surrounding whitespace",
    function givenEmailWithSurroundingWhitespace_whenValidated_thenReturnsTrue() {
      // Given
      const email = "  person@example.com  ";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, true);
    },
  );

  it(
    "returns false when the email is missing a local part",
    function givenEmailWithoutLocalPart_whenValidated_thenReturnsFalse() {
      // Given
      const email = "@example.com";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, false);
    },
  );

  it(
    "returns false when the email is missing an at sign",
    function givenEmailWithoutAtSign_whenValidated_thenReturnsFalse() {
      // Given
      const email = "person.example.com";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, false);
    },
  );

  it(
    "returns false when the email is missing a domain suffix",
    function givenEmailWithoutDomainSuffix_whenValidated_thenReturnsFalse() {
      // Given
      const email = "person@example";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, false);
    },
  );

  it(
    "returns false when the email contains whitespace",
    function givenEmailWithInternalWhitespace_whenValidated_thenReturnsFalse() {
      // Given
      const email = "person @example.com";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, false);
    },
  );

  it(
    "returns false when the email is empty",
    function givenEmptyEmail_whenValidated_thenReturnsFalse() {
      // Given
      const email = "";

      // When
      const result = validateEmail(email);

      // Then
      assert.equal(result, false);
    },
  );
});
