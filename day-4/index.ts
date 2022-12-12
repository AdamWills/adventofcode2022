import { calculateOverlappingPairs, calculateAnyOverlappingPairs } from './utils.ts';

// Part A
const partA = calculateOverlappingPairs( await Deno.readTextFile("./input.txt") );
console.log('Part A - number of overlapping pairs:', partA);

const partB = calculateAnyOverlappingPairs( await Deno.readTextFile("./input.txt") );
console.log('Part B - number of any overlapping pairs:', partB);