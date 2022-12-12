import { calculateTopCratesFromInput } from "./utils.ts";

// Part A
const partA = calculateTopCratesFromInput(
  await Deno.readTextFile("./input.txt"),
);
console.log("Part A - top crates:", partA);

const partB = calculateTopCratesFromInput(
  await Deno.readTextFile("./input.txt"),
  true,
);
console.log("Part B - top crates:", partB);
