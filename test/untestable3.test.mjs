import { readFile } from "node:fs/promises";
import { describe, test } from "vitest";
import { expect, fail } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {
  test("characterization test", async () => {
    const csvData = await readFile('./test/people.csv', { encoding: "utf8" });
    const got = await parsePeopleCsv(csvData);
    const expected = [
      { firstName: "firstName", lastName: "lastName", gender: "g", age: NaN },
      { firstName: "Loid", lastName: "Forger", gender: "m" },
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
    ];
    expect(got).to.deep.equal(expected);
  });

});
