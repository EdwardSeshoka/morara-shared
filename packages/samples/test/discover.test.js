import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createDiscover, createPublicWines } from "../dist/index.js";

describe("createPublicWines", () => {
  it("returns the sample wine catalog as WineContract records", () => {
    const wines = createPublicWines();
    assert.ok(wines.length > 0);
    assert.equal(wines.find((wine) => wine.id === "rubicon-2018")?.name, "Rubicon");
  });
});

describe("createDiscover", () => {
  it("features a wine hero resolved from the wine catalog", () => {
    const home = createDiscover();

    assert.equal(home.hero?.kind, "wine");
    if (home.hero?.kind !== "wine") {
      assert.fail("expected a wine hero");
    }

    assert.equal(home.hero.wine.id, "rubicon-2018");
    assert.equal(home.hero.wine.name, "Rubicon");
    assert.equal(home.hero.feature?.label, "THIS WEEK'S PICK");
    assert.equal(home.hero.feature?.volume, 47);
  });

  it("arranges sections as compositions of domain contracts", () => {
    const home = createDiscover();

    assert.deepEqual(
      home.sections.map((section) => section.type),
      ["editorial", "regions", "producers", "room", "events"]
    );

    const regions = home.sections.find((section) => section.type === "regions");
    assert.equal(regions?.items[0]?.name, "Stellenbosch");
    assert.equal(regions?.items[0]?.producerCount, 142);

    const producers = home.sections.find((section) => section.type === "producers");
    assert.equal(producers?.items[0]?.name, "Meerlust Estate");
    assert.equal(producers?.items[0]?.regionName, "Stellenbosch");

    const room = home.sections.find((section) => section.type === "room");
    assert.equal(room?.items[0]?.user.displayName, "Sarah Mitchell");
    assert.equal(room?.items[0]?.wine.name, "Kanonkop Pinotage");
    assert.equal(room?.items[0]?.rating, 4.5);
  });

  it("carries only contract fields — no view data leaks onto activities", () => {
    const home = createDiscover();
    const room = home.sections.find((section) => section.type === "room");

    assert.deepEqual(Object.keys(room.items[0].user).sort(), [
      "displayName",
      "id",
      "initials",
      "role"
    ]);
  });

  it("composes the hero against injected catalog wines", () => {
    const injected = createPublicWines().map((wine) =>
      wine.id === "rubicon-2018" ? { ...wine, name: "Rubicon (real)" } : wine
    );

    const home = createDiscover({ wines: injected });

    assert.equal(home.hero?.kind, "wine");
    if (home.hero?.kind !== "wine") {
      assert.fail("expected a wine hero");
    }
    assert.equal(home.hero.wine.name, "Rubicon (real)");
  });
});
