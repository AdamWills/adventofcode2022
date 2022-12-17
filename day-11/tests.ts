import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import Monkey from "./class.monkey.ts";
import {
  getLevelOfMonkeyBusiness,
  getModulo,
  partAReduceWorry,
  partBReduceWorry,
} from "./utils.ts";

//number of rounds = 20
const createMonkeys = (): Monkey[] => {
  return [
    new Monkey(
      "Monkey 0",
      [79, 98],
      { a: "old", b: 19, operand: "*" },
      23,
      [2, 3],
    ),
    new Monkey(
      "Monkey 1",
      [54, 65, 75, 74],
      { a: "old", b: 6, operand: "+" },
      19,
      [2, 0],
    ),
    new Monkey(
      "Monkey 2",
      [79, 60, 97],
      { a: "old", b: "old", operand: "*" },
      13,
      [1, 3],
    ),
    new Monkey(
      "Monkey 3",
      [74],
      { a: "old", b: 3, operand: "+" },
      17,
      [0, 1],
    ),
  ];
};

Deno.test("Monkey class", () => {
  const monkeys = createMonkeys();
  assertEquals(monkeys[0].name, "Monkey 0");
  assertEquals(monkeys[0].startingItems, [79, 98]);
  assertEquals(monkeys[0].testDivisor, 23);
  assertEquals(monkeys[0].testResult, [2, 3]);
});

Deno.test("Monkey turns", () => {
  const monkeys = createMonkeys();
  // Round 1
  monkeys.forEach((monkey) => {
    monkey.takeTurn(monkeys, partAReduceWorry);
  });
  assertEquals(monkeys[0].startingItems, [20, 23, 27, 26]);
  assertEquals(monkeys[1].startingItems, [2080, 25, 167, 207, 401, 1046]);
  assertEquals(monkeys[2].startingItems, []);
  assertEquals(monkeys[3].startingItems, []);

  // Round 2
  monkeys.forEach((monkey) => {
    monkey.takeTurn(monkeys, partAReduceWorry);
  });
  assertEquals(monkeys[0].startingItems, [695, 10, 71, 135, 350]);
  assertEquals(monkeys[1].startingItems, [43, 49, 58, 55, 362]);
  assertEquals(monkeys[2].startingItems, []);
  assertEquals(monkeys[3].startingItems, []);

  // Round 3
  monkeys.forEach((monkey) => {
    monkey.takeTurn(monkeys, partAReduceWorry);
  });
  assertEquals(monkeys[0].startingItems, [16, 18, 21, 20, 122]);
  assertEquals(monkeys[1].startingItems, [1468, 22, 150, 286, 739]);
  assertEquals(monkeys[2].startingItems, []);
  assertEquals(monkeys[3].startingItems, []);
});

Deno.test("Monkey 20 turns", () => {
  const monkeys = createMonkeys();
  const numberOfTurns = 20;
  for (let i = 0; i < numberOfTurns; i++) {
    monkeys.forEach((monkey) => {
      monkey.takeTurn(monkeys, partAReduceWorry);
    });
  }

  assertEquals(monkeys[0].startingItems, [10, 12, 14, 26, 34]);
  assertEquals(monkeys[1].startingItems, [245, 93, 53, 199, 115]);
  assertEquals(monkeys[2].startingItems, []);
  assertEquals(monkeys[3].startingItems, []);
});

Deno.test("Inspection counts", () => {
  const monkeys = createMonkeys();
  const numberOfTurns = 20;
  for (let i = 0; i < numberOfTurns; i++) {
    monkeys.forEach((monkey) => {
      monkey.takeTurn(monkeys, partAReduceWorry);
    });
  }

  assertEquals(monkeys[0].inspectionCount, 101);
  assertEquals(monkeys[1].inspectionCount, 95);
  assertEquals(monkeys[2].inspectionCount, 7);
  assertEquals(monkeys[3].inspectionCount, 105);
});

Deno.test("Get Monkey Business", () => {
  const monkeys = createMonkeys();
  const numberOfTurns = 20;
  for (let i = 0; i < numberOfTurns; i++) {
    monkeys.forEach((monkey) => {
      monkey.takeTurn(monkeys, partAReduceWorry);
    });
  }
  assertEquals(getLevelOfMonkeyBusiness(monkeys), 10605);
});

Deno.test("Inspection counts without worrying", () => {
  const monkeys = createMonkeys();
  const numberOfTurns = 1;

  const modulo = getModulo(monkeys);

  for (let i = 0; i < numberOfTurns; i++) {
    monkeys.forEach((monkey) => {
      monkey.takeTurn(monkeys, partBReduceWorry(modulo), true);
    });
  }

  assertEquals(monkeys[0].inspectionCount, 2);
  assertEquals(monkeys[1].inspectionCount, 4);
  assertEquals(monkeys[2].inspectionCount, 3);
  assertEquals(monkeys[3].inspectionCount, 6);

  // 19 more turns
  for (let i = 0; i < 19; i++) {
    monkeys.forEach((monkey) => {
      monkey.takeTurn(monkeys, partBReduceWorry(modulo), true);
    });
  }
  assertEquals(monkeys[0].inspectionCount, 99);
  assertEquals(monkeys[1].inspectionCount, 97);
  assertEquals(monkeys[2].inspectionCount, 8);
  assertEquals(monkeys[3].inspectionCount, 103);
});
