import {
  getSizeOfSmallDirectories,
  processInputIntoDirectoryMap,
} from "./utils.ts";

// Part A
const directoryMap = processInputIntoDirectoryMap(
  await Deno.readTextFile("./input.txt"),
);
const partA = getSizeOfSmallDirectories(directoryMap, 100000);
console.log("Part A:", partA);

// Part B
const totalSize = directoryMap["/"].size;
const diskSpaceAvailable = 70000000;
const requiredSize = 30000000;
const diskSpaceLeft = diskSpaceAvailable - totalSize;
const diff = requiredSize - diskSpaceLeft;

// loop through directories and find the smallest one
const smallestSize = Object.keys(directoryMap).reduce((acc, key) => {
  const size = directoryMap[key].size;
  if (size > diff && size < acc) {
    console.log("found smaller dir", key, size);
    return size;
  }
  return acc;
}, requiredSize);

console.log("smallest dir", smallestSize);
