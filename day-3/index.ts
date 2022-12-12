
import { calculateBadgePriority, calculatePriority } from './utils/index.ts';

const partAResult = await calculatePriority( await Deno.readTextFile("./input.txt") );
console.log( `Part A: ${partAResult}` );

// Part B
const partBResult = await calculateBadgePriority( await Deno.readTextFile("./input.txt") );
console.log( `Part B: ${partBResult}` );