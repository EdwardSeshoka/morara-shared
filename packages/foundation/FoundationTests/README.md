# Foundation tests

Foundation tests are organized as follows:

- `Tests` contains tests grouped to mirror the production source structure.
- `TestDoubles` contains reusable mocks, spies, and stubs.

Each test uses a named function with this format:

```text
givenCondition_whenAction_thenExpectedResult
```

The function body is divided into `// Given`, `// When`, and `// Then` sections.

Run the foundation suite locally with:

```bash
npm test --workspace @edwardseshoka/foundation
```

The root `npm test` command also runs this suite and is used by shared-package CI.
