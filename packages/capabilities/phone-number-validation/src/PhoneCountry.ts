import {
  getCountries,
  getCountryCallingCode,
  isSupportedCountry,
  type CountryCode,
} from "libphonenumber-js/mobile";

import type { PhoneCountryCode } from "./MobileNumberValidation.js";

export type PhoneCountry = {
  code: PhoneCountryCode;
  callingCode: string;
};

const phoneCountries: ReadonlyArray<PhoneCountry> = Object.freeze(
  getCountries().map((code) =>
    Object.freeze({
      code,
      callingCode: getCountryCallingCode(code),
    }),
  ),
);

export function getPhoneCountries(): ReadonlyArray<PhoneCountry> {
  return phoneCountries;
}

export function isPhoneCountryCode(value: string): value is CountryCode {
  return isSupportedCountry(value);
}
