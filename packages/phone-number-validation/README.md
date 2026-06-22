# @edwardseshoka/phone-number-validation

Shared international mobile-number parsing, validation, and E.164 normalization
for Morara frontend and backend applications.

This package is the only Morara package that depends directly on
`libphonenumber-js`. Consumers use the Morara API instead of importing the
underlying library.

```ts
import {
  getPhoneCountries,
  validateMobileNumber,
} from "@edwardseshoka/phone-number-validation";

const countries = getPhoneCountries();
const validation = validateMobileNumber("06 12 34 56 78", "FR");
```

Phone-number validation is synchronous and only verifies number structure.
Reachability and ownership must be verified separately through an application
use case such as an SMS OTP challenge.
