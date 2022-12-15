import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import {
  getHighestScenicScore,
  getVisibleTrees,
  isVisibleFromBottom,
  isVisibleFromLeft,
  isVisibleFromRight,
  isVisibleFromTop,
  parseInput,
} from "./utils.ts";

// read test.txt
const testData = await Deno.readTextFile("./test.txt");
const matrix = parseInput(testData);
console.log(matrix);

Deno.test("Examples", () => {
  // top left 5
  assertEquals(isVisibleFromLeft(matrix, 1, 1), true);
  assertEquals(isVisibleFromRight(matrix, 1, 1), false);
  assertEquals(isVisibleFromTop(matrix, 1, 1), true);
  assertEquals(isVisibleFromBottom(matrix, 1, 1), false);

  // top middle 5
  assertEquals(isVisibleFromLeft(matrix, 2, 1), false);
  assertEquals(isVisibleFromRight(matrix, 2, 1), true);
  assertEquals(isVisibleFromTop(matrix, 2, 1), true);
  assertEquals(isVisibleFromBottom(matrix, 2, 1), false);

  // top right 1
  assertEquals(isVisibleFromLeft(matrix, 1, 3), false);
  assertEquals(isVisibleFromRight(matrix, 1, 3), false);
  assertEquals(isVisibleFromTop(matrix, 1, 3), false);
  assertEquals(isVisibleFromBottom(matrix, 1, 3), false);

  // left middle 5
  assertEquals(isVisibleFromLeft(matrix, 1, 2), false);
  assertEquals(isVisibleFromRight(matrix, 1, 2), true);
  assertEquals(isVisibleFromTop(matrix, 1, 2), false);
  assertEquals(isVisibleFromBottom(matrix, 1, 2), false);

  // center 3
  assertEquals(isVisibleFromLeft(matrix, 2, 2), false);
  assertEquals(isVisibleFromRight(matrix, 2, 2), false);
  assertEquals(isVisibleFromTop(matrix, 2, 2), false);
  assertEquals(isVisibleFromBottom(matrix, 2, 2), false);

  // right middle 3
  assertEquals(isVisibleFromLeft(matrix, 3, 2), false);
  assertEquals(isVisibleFromRight(matrix, 3, 2), true);
  assertEquals(isVisibleFromTop(matrix, 3, 2), false);
  assertEquals(isVisibleFromBottom(matrix, 3, 2), false);

  // bottom middle 5
  assertEquals(isVisibleFromLeft(matrix, 2, 4), false);
  assertEquals(isVisibleFromRight(matrix, 2, 4), false);
  assertEquals(isVisibleFromTop(matrix, 2, 4), false);
  assertEquals(isVisibleFromBottom(matrix, 2, 4), true);
});

Deno.test("Step A", () => {
  assertEquals(getVisibleTrees(testData), 21);
});

Deno.test("Step B", () => {
  assertEquals(getHighestScenicScore(testData), 8);
});
