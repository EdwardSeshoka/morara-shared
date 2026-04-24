# Changesets

Add a changeset in every PR that affects a published package in this repo.

- `patch`: backward-compatible fix
- `minor`: backward-compatible feature
- `major`: breaking change

Run:

```bash
npx changeset
```

Then commit the generated markdown file in `.changeset/`.
