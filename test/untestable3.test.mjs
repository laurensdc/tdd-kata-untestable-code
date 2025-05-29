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
    const csvData = await readFile("./test/people.csv", { encoding: "utf8" });
    const got = await parsePeopleCsv(csvData);
    const expected = [
      { firstName: "firstName", lastName: "lastName", gender: "g", age: NaN },
      { firstName: "Loid", lastName: "Forger", gender: "m" },
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
    ];
    expect(got).to.deep.equal(expected);
  });

  test("returns expected format", () => {
    const input = `Anya,Forger,6,Female`;
    const got = parsePeopleCsv(input);
    const expected = [{ firstName: "Anya", lastName: "Forger", gender: "f", age: 6 }];
    expect(got).to.deep.equal(expected);
  });

  test("can parse multiple lines", () => {
    const input = `Anya,Forger,6,Female
Yor,Forger,27,Female`;
    const got = parsePeopleCsv(input);
    const expected = [
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
    ];
    expect(got).to.deep.equal(expected);
  });

  test("handles blank lines before and in between", () => {
    const input = `
    
    Anya,Forger,6,Female


Yor,Forger,27,Female`;
    const got = parsePeopleCsv(input);
    const expected = [
      { firstName: "Anya", lastName: "Forger", gender: "f", age: 6 },
      { firstName: "Yor", lastName: "Forger", gender: "f", age: 27 },
    ];
    expect(got).to.deep.equal(expected);
  });

  test("converts missing age as NaN", () => {
    const input = `Anya,Forger,,Female`;
    const got = parsePeopleCsv(input);
    const expected = [{ firstName: "Anya", lastName: "Forger", gender: "f" }];
    expect(got).to.deep.equal(expected);
  });

  test("converts strings in age as NaN", () => {
    const input = `Loid,Forger,yo this aint right,Male`;
    const got = parsePeopleCsv(input);
    const expected = [{ firstName: "Loid", lastName: "Forger", gender: "m", age: NaN }];
    expect(got).to.deep.equal(expected);
  });

  test("leaves out missing age", () => {
    const input = `Louis,Forger,,Male`;
    const got = parsePeopleCsv(input);
    const expected = [{ firstName: "Louis", lastName: "Forger", gender: "m" }];
    expect(got).to.deep.equal(expected);
  });

  test("parses missing names and genders as empty string", () => {
    const input = `,,,`;
    const got = parsePeopleCsv(input);
    const expected = [{ firstName: "", lastName: "", gender: "" }];
    expect(got).to.deep.equal(expected);
  });
});
