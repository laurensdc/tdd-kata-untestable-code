import { describe, test } from "vitest";
import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1.mjs";

describe("Untestable 1: days until Christmas", () => {
  test("characterization test", () => {
    expect(daysUntilChristmas()).to.equal(210);
    expect(daysUntilChristmas()).to.be.a("number");
  });
});
