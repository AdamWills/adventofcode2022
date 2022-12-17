import Monkey from "./class.monkey.ts";
import {
  getLevelOfMonkeyBusiness,
  getModulo,
  partAReduceWorry,
  partBReduceWorry,
} from "./utils.ts";

const generateMonkeys = () => [
  new Monkey(
    "Monkey 0",
    [75, 75, 98, 97, 79, 97, 64],
    { a: "old", b: 13, operand: "*" },
    19,
    [2, 7],
  ),
  new Monkey(
    "Monkey 1",
    [50, 99, 80, 84, 65, 95],
    { a: "old", b: 2, operand: "+" },
    3,
    [4, 5],
  ),
  new Monkey(
    "Monkey 2",
    [96, 74, 68, 96, 56, 71, 75, 53],
    { a: "old", b: 1, operand: "+" },
    11,
    [7, 3],
  ),
  new Monkey(
    "Monkey 3",
    [83, 96, 86, 58, 92],
    { a: "old", b: 8, operand: "+" },
    17,
    [6, 1],
  ),
  new Monkey(
    "Monkey 4",
    [99],
    { a: "old", b: "old", operand: "*" },
    5,
    [0, 5],
  ),
  new Monkey(
    "Monkey 5",
    [60, 54, 83],
    { a: "old", b: 4, operand: "+" },
    2,
    [2, 0],
  ),
  new Monkey(
    "Monkey 6",
    [77, 67],
    { a: "old", b: 17, operand: "*" },
    13,
    [4, 1],
  ),
  new Monkey(
    "Monkey 7",
    [95, 65, 58, 76],
    { a: "old", b: 5, operand: "+" },
    7,
    [3, 6],
  ),
];

// Part A
const monkeys = generateMonkeys();
const numberOfTurns = 20;
for (let i = 0; i < numberOfTurns; i++) {
  monkeys.forEach((monkey) => {
    monkey.takeTurn(monkeys, partAReduceWorry);
  });
}
console.log("part A: ", getLevelOfMonkeyBusiness(monkeys));

// Part B
const monkeys2 = generateMonkeys();
const numberOfTurns2 = 10000;
const modulo = getModulo(monkeys2);
for (let i = 0; i < numberOfTurns2; i++) {
  monkeys2.forEach((monkey) => {
    monkey.takeTurn(monkeys2, partBReduceWorry(modulo));
  });
}
console.log("part B: ", getLevelOfMonkeyBusiness(monkeys2));
