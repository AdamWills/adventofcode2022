import {
  assertEquals,
  assertNotEquals,
} from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { convertInputToMap, findShortestPath } from "./utils.ts";

const map = convertInputToMap(await Deno.readTextFile("test.txt"));

Deno.test("Mapping", () => {
  assertNotEquals(map.start, undefined);
  assertNotEquals(map.end, undefined);
});

Deno.test("Shortest Path Test", () => {
  assertEquals(findShortestPath(map, "start", "end"), 31);
});
