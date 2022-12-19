import { convertInputToMap, findShortestPath } from "./utils.ts";

const map = convertInputToMap(await Deno.readTextFile("input.txt"));

const shortestPath = findShortestPath(map, "start", "end");
console.log(`Part A: ${shortestPath}`);
