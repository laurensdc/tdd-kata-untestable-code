import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
  test("characterization test", () => {
    expect(daysUntilChristmas(today)).to.equal(210);
    expect(daysUntilChristmas(today)).to.be.a("number");
  });
});
