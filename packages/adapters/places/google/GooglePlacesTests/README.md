# Google Places adapter tests

- `Tests` contains tests that mirror the production source.
- `TestDoubles` contains reusable mocks, spies, and stubs.

Test functions use:

```text
givenCondition_whenAction_thenExpectedResult
```

Each test body is divided into `// Given`, `// When`, and `// Then` sections.

Run locally with:

```bash
npm test --workspace @edwardseshoka/google-places-adapter
```
