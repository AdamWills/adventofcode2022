import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import {
  calculateAnyOverlappingPairs,
  calculateOverlappingPairs,
} from "./utils.ts";

Deno.test("part A", async () => {
  const pairs = calculateOverlappingPairs(
    await Deno.readTextFile("./test.txt"),
  );
  assertEquals(pairs, 2);
});

Deno.test("part B", async () => {
  const pairs = calculateAnyOverlappingPairs(
    await Deno.readTextFile("./test.txt"),
  );
  assertEquals(pairs, 4);
});
