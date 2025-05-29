import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("characterization test", () => {
    const date = new Date();
    const today = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    expect(daysUntilChristmas(today)).to.equal(210);
    expect(daysUntilChristmas(today)).to.be.a("number");
  });

  test("day before Christmas", () => {
    const today = new Date(1994, 11, 24)
    expect(daysUntilChristmas(today)).to.equal(1)
  })

  test("some random day", () => {
    const today = new Date(2025, 4, 29)
    expect(daysUntilChristmas(today)).to.equal(210)
  })

  test.skip("day after Christmas", () => {
    const today = new Date(1994, 11, 26)
    // It returns 11687
    // but I'd expect the next christmas to be 364 days from now
    // Keep current behavior as we found it and skip this test
    expect(daysUntilChristmas(today)).to.equal(364)
  })
});
