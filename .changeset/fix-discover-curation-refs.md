---
"@edwardseshoka/samples": patch
---

Fix discover curation refs that pointed at non-existent content. The
`this_week_in_wine` (editorial) and `the_room` (room activity) sections referenced
ids that don't exist in the editorial / social fixtures, so composing the discover
response left those sections empty. Re-point them at the real fixture ids
(`article_why_2018_stellenbosch` · `guide_field_guide_swartland_chenin` ·
`article_decanting_how_long`; the three seeded activities), matching the ids the
`discover-response.json` output fixture already uses.
