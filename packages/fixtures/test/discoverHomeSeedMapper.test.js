import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createDiscoverHomeResponseFromSeeds } from "../dist/index.js";

describe("createDiscoverHomeResponseFromSeeds", () => {
  it("resolves the curated wine hero from the source wine seed", () => {
    const home = createDiscoverHomeResponseFromSeeds();

    assert.equal(home.hero?.type, "wine");
    assert.equal(home.hero?.id, "hero-rubicon-2018");
    assert.equal(home.hero?.title, "Rubicon");
    assert.equal(home.hero?.label, "THIS WEEK'S PICK");
    assert.equal(home.hero?.volume, 47);

    if (home.hero?.type !== "wine") {
      assert.fail("Expected a wine hero.");
    }

    assert.equal(home.hero.wineId, "rubicon-2018");
    assert.equal(home.hero.estateName, "Meerlust Estate");
    assert.equal(home.hero.regionName, "Stellenbosch");
    assert.equal(home.hero.styleName, "Bordeaux Blend");
    assert.equal(home.hero.vintage, 2018);
    assert.deepEqual(
      home.hero.ctas.map((cta) => cta.id),
      ["request_taste", "add_to_cellar", "open_story"],
    );
  });

  it("resolves each Discover Home section into frontend-ready card data", () => {
    const home = createDiscoverHomeResponseFromSeeds();

    const sectionTypes = home.sections.map((section) => section.type);

    assert.deepEqual(sectionTypes, [
      "editorial_cards",
      "region_cards",
      "producer_cards",
      "room_activity",
      "event_cards",
    ]);

    const weekly = home.sections.find((section) => section.type === "editorial_cards");
    assert.equal(weekly?.items[0]?.title, "Old Vines, New Voices");
    assert.equal(weekly?.items[0]?.categoryLabel, "NEW ARRIVAL");

    const regions = home.sections.find((section) => section.type === "region_cards");
    assert.equal(regions?.items[0]?.name, "Stellenbosch");
    assert.equal(regions?.items[0]?.producerCount, 142);
    assert.equal(regions?.items[0]?.wineCount, 1820);

    const producers = home.sections.find((section) => section.type === "producer_cards");
    assert.equal(producers?.items[0]?.name, "Meerlust Estate");
    assert.equal(producers?.items[0]?.regionName, "Stellenbosch");

    const room = home.sections.find((section) => section.type === "room_activity");
    assert.equal(room?.items[0]?.user.displayName, "Sarah Mitchell");
    assert.equal(room?.items[0]?.wine.name, "Kanonkop Pinotage");
    assert.equal(room?.items[0]?.rating, 4.5);

    const events = home.sections.find((section) => section.type === "event_cards");
    assert.equal(events?.items[0]?.title, "Swartland, Six Ways");
    assert.equal(events?.items[0]?.eventTypeLabel, "SOMMELIER-LED");
  });
});
