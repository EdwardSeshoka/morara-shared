---
"@edwardseshoka/samples": patch
---

Reference the two new "This week in wine" reads from the discover plan.

7.0.2 added the TASTING and NOTE items to the editorial *pool*
(`editorial.json`), but `composeDiscover` builds each section from the plan's
`itemRefs` — not from the pool — so the section still resolved to its original
three and the Read index collapsed to a single row.

`curation.json`'s `this_week_in_wine` now references all five items (priorities
1–5). The pool holds what exists; the plan decides what appears — both have to be
updated together for a new read to reach the page.
