---
"@edwardseshoka/samples": patch
---

Carry the two new "This week in wine" reads into `editorial.json`.

7.0.1 added the TASTING and NOTE items to `discover-response.json` only — the
frozen snapshot the frontend's app-double replays. The backend composes Discover
from `editorialSamples` (`editorial.json`), so a deployed frontend still saw the
original three and the Read section's index collapsed to a single row.

Both fixtures now carry the same five items, with matching ids so they cannot
drift apart again. Data-only; no contract change.
