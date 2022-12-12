import { getFirstMarker } from "./utils.ts";

// Part A
const partA = getFirstMarker(await Deno.readTextFile("./input.txt"), 4);
console.log("Part A:", partA);

// Part B
const partB = getFirstMarker(await Deno.readTextFile("./input.txt"), 14);
console.log("Part A:", partB);
