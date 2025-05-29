import { describe, test } from "vitest";
import { expect } from "chai";
import { diceHandValue } from "../src/untestable2.mjs";

describe("Untestable 2: a dice game", () => {
  test("return 100 + highest value for equal dice", () => {
    expect(diceHandValue(5, 5)).to.equal(105);
  });

  test("return highest value for non-equal dice", () => {
    expect(diceHandValue(5, 2)).to.equal(5);
  })
});
