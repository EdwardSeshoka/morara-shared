import {
  isSupportedCountry,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js/mobile";

export type PhoneCountryCode = CountryCode;

export type MobileNumberValidationFailure =
  | "empty"
  | "countryRequired"
  | "unsupportedCountry"
  | "invalidNumber";

export type MobileNumberValidation = {
  valid: boolean;
  e164: string | null;
  countryCode: PhoneCountryCode | null;
  countryCallingCode: string | null;
  failure: MobileNumberValidationFailure | null;
};

export function validateMobileNumber(
  value: string,
  countryCode?: string,
): MobileNumberValidation {
  const trimmedValue = value.trim();

  if (trimmedValue.length === 0) {
    return invalidMobileNumber("empty");
  }

  if (countryCode && !isSupportedCountry(countryCode)) {
    return invalidMobileNumber("unsupportedCountry");
  }

  if (!countryCode && !trimmedValue.startsWith("+")) {
    return invalidMobileNumber("countryRequired");
  }

  const phoneNumber = parsePhoneNumberFromString(
    trimmedValue,
    countryCode as PhoneCountryCode | undefined,
  );

  if (!phoneNumber?.isValid()) {
    return invalidMobileNumber("invalidNumber");
  }

  return {
    valid: true,
    e164: phoneNumber.number,
    countryCode: phoneNumber.country ?? null,
    countryCallingCode: phoneNumber.countryCallingCode,
    failure: null,
  };
}

function invalidMobileNumber(
  failure: MobileNumberValidationFailure,
): MobileNumberValidation {
  return {
    valid: false,
    e164: null,
    countryCode: null,
    countryCallingCode: null,
    failure,
  };
}
