import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import {
  applyProcedure,
  calculateTopCratesFromInput,
  getTopCrates,
  parseFile,
  parseProcedureLine,
  parseStackLine,
  transformStacks,
} from "./utils.ts";

Deno.test("parse line", () => {
  assertEquals(parseStackLine("[M] [H]         [N]"), ["M", "H", "", "", "N"]);
  assertEquals(parseStackLine("[J] [J]         [B]     [S] [B] [F]"), [
    "J",
    "J",
    "",
    "",
    "B",
    "",
    "S",
    "B",
    "F",
  ]);
  assertEquals(parseStackLine("[R] [P] [W] [N] [M] [P] [R] [Q] [L]"), [
    "R",
    "P",
    "W",
    "N",
    "M",
    "P",
    "R",
    "Q",
    "L",
  ]);
});

Deno.test("parse procedure line", () => {
  assertEquals(parseProcedureLine(`move 1 from 7 to 6`), {
    pieces: 1,
    from: 7,
    to: 6,
  });
});

Deno.test("parse file", () => {
  const input = `[N] [N] [R] [B] [Z] [R] [T] [T] [M]
[M] [H]         [N]
1   2   3   4   5   6   7   8   9

move 1 from 7 to 6
move 1 from 9 to 4`;

  const output = parseFile(input);
  assertEquals(output.stacks.length, 2);
  assertEquals(output.procedures.length, 2);
});

Deno.test("transform stacks", () => {
  const input = `    [D]
[N] [C]
[Z] [M] [P]`;
  const stacks = parseFile(input).stacks;
  const expected = [["Z", "N"], ["M", "C", "D"], ["P"]];
  const output = transformStacks(stacks);
  assertEquals(output, expected);
});

Deno.test("apply procedure", () => {
  const input = [["Z", "N"], ["M", "C", "D"], ["P"]];
  const stepOneResult = applyProcedure(input, { pieces: 1, from: 2, to: 1 });
  assertEquals(stepOneResult, [["Z", "N", "D"], ["M", "C"], ["P"]]);
  const stepTwoResult = applyProcedure(stepOneResult, {
    pieces: 3,
    from: 1,
    to: 3,
  });
  assertEquals(stepTwoResult, [[], ["M", "C"], ["P", "D", "N", "Z"]]);
});

Deno.test("apply procedure supporting multiple crate moves", () => {
  const input = [["Z", "N", "D"], ["M", "C"], ["P"]];
  const result = applyProcedure(input, { pieces: 3, from: 1, to: 3 }, true);
  assertEquals(result, [[], ["M", "C"], ["P", "Z", "N", "D"]]);
});

Deno.test("top crates", () => {
  const input = [["C"], ["M"], ["P", "D", "N", "Z"]];
  assertEquals(getTopCrates(input), "CMZ");
});

Deno.test("Step A", async () => {
  const input = await Deno.readTextFile("./test.txt");
  assertEquals(calculateTopCratesFromInput(input), "CMZ");
});

Deno.test("Step B", async () => {
  const input = await Deno.readTextFile("./test.txt");
  assertEquals(calculateTopCratesFromInput(input, true), "MCD");
});
