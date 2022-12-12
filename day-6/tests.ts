import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import { getFirstMarker } from "./utils.ts";

Deno.test("Step A", () => {
  assertEquals(getFirstMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 4), 7);
  assertEquals(getFirstMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 4), 5);
  assertEquals(getFirstMarker("nppdvjthqldpwncqszvftbrmjlhg", 4), 6);
  assertEquals(getFirstMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 4), 10);
  assertEquals(getFirstMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 4), 11);
});

Deno.test("Step B", () => {
  assertEquals(getFirstMarker("mjqjpqmgbljsphdztnvjfqwrcgsmlb", 14), 19);
  assertEquals(getFirstMarker("bvwbjplbgvbhsrlpgdmjqwftvncz", 14), 23);
  assertEquals(getFirstMarker("nppdvjthqldpwncqszvftbrmjlhg", 14), 23);
  assertEquals(getFirstMarker("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", 14), 29);
  assertEquals(getFirstMarker("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw", 14), 26);
});
