import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import {
  getSizeOfSmallDirectories,
  processInputIntoDirectoryMap,
} from "./utils.ts";

const testData = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`;

Deno.test("Calcluating sizes of directories", () => {
  const directoryMap = processInputIntoDirectoryMap(testData);
  assertEquals(directoryMap["/a/e"].size, 584);
  assertEquals(directoryMap["/a"].size, 94853);
  assertEquals(directoryMap["/d"].size, 24933642);
  assertEquals(directoryMap["/"].size, 48381165);
});

Deno.test("Step A", () => {
  const directoryMap = processInputIntoDirectoryMap(testData);
  assertEquals(getSizeOfSmallDirectories(directoryMap, 100000), 95437);
});
