import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import {
  calculateBadgePriority,
  calculatePriority,
  findCommonCharacters,
  getPriorityValue,
  splitStringInTwoEqualParts,
} from "./utils/index.ts";

Deno.test("split string", () => {
  const [first, second] = splitStringInTwoEqualParts(
    "vJrwpWtwJgWrhcsFMMfFFhFp",
  );
  assertEquals(first, "vJrwpWtwJgWr");
  assertEquals(second, "hcsFMMfFFhFp");
});

Deno.test("priority value", () => {
  assertEquals(getPriorityValue("p"), 16);
  assertEquals(getPriorityValue("L"), 38);
  assertEquals(getPriorityValue("P"), 42);
  assertEquals(getPriorityValue("v"), 22);
});

Deno.test("common characters", () => {
  assertEquals(
    findCommonCharacters([
      "vJrwpWtwJgWrhcsFMMfFFhFp",
      "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
      "PmmdzqPrVvPwwTWBwg",
    ]),
    "r",
  );
  assertEquals(
    findCommonCharacters([
      "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
      "ttgJtRGJQctTZtZT",
      "CrZsJsPPZsGzwwsLwLmpwMDw",
    ]),
    "Z",
  );
});

Deno.test("part A", async () => {
  const priority = calculatePriority(await Deno.readTextFile("./test.txt"));
  assertEquals(priority, 157);
});

Deno.test("part B", async () => {
  const priority = calculateBadgePriority(
    await Deno.readTextFile("./test.txt"),
  );
  assertEquals(priority, 70);
});
