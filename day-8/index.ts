import { getHighestScenicScore, getVisibleTrees } from "./utils.ts";

const input = await Deno.readTextFile("./input.txt");

// Part A
const partA = getVisibleTrees(input);
console.log("PART A:", partA);

const partB = getHighestScenicScore(input);
console.log("PART B:", partB);
