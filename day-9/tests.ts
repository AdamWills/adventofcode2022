import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import Head from "./class.head.ts";
import Tail from "./class.tail.ts";
import Knot from "./class.knot.ts";
import { handleMove, parseCommand } from "./utils.ts";

interface coords {
  x: number;
  y: number;
}

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

const assertHeadAndTail = (
  head: Head,
  tail: Tail,
  expectedHead: coords,
  expectedTail: coords,
) => {
  assertEquals(head.x, expectedHead.x);
  assertEquals(head.y, expectedHead.y);
  assertEquals(tail.x, expectedTail.x);
  assertEquals(tail.y, expectedTail.y);
};

Deno.test("Testing movements", () => {
  const head = new Head();
  const tail = new Tail(head);

  console.log("R 4");
  handleMove("R", 4, head, [tail]);
  assertHeadAndTail(head, tail, { x: 4, y: 0 }, { x: 3, y: 0 });

  console.log("U 4");
  handleMove("U", 4, head, [tail]);
  assertHeadAndTail(head, tail, { x: 4, y: 4 }, { x: 4, y: 3 });

  console.log("L 3");
  handleMove("L", 3, head, [tail]);
  assertHeadAndTail(head, tail, { x: 1, y: 4 }, { x: 2, y: 4 });

  console.log("D 1");
  handleMove("D", 1, head, [tail]);
  assertHeadAndTail(head, tail, { x: 1, y: 3 }, { x: 2, y: 4 });

  console.log("R 4");
  handleMove("R", 4, head, [tail]);
  assertHeadAndTail(head, tail, { x: 5, y: 3 }, { x: 4, y: 3 });

  console.log("D 1");
  handleMove("D", 1, head, [tail]);
  assertHeadAndTail(head, tail, { x: 5, y: 2 }, { x: 4, y: 3 });

  console.log("L 5");
  handleMove("L", 5, head, [tail]);
  assertHeadAndTail(head, tail, { x: 0, y: 2 }, { x: 1, y: 2 });

  console.log("R 2");
  handleMove("R", 2, head, [tail]);
  assertHeadAndTail(head, tail, { x: 2, y: 2 }, { x: 1, y: 2 });
});

Deno.test("Part A", () => {
  const head = new Head();
  const tail = new Tail(head);

  const commands = testInput.split(/\r?\n/).map(parseCommand);
  commands.forEach(({ direction, numberOfMoves }) => {
    handleMove(direction, numberOfMoves, head, [tail]);
  });
  assertEquals(tail.uniquePositions.length, 13);
});

Deno.test("Part B", () => {
  const input = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

  const head = new Head();
  const knots: (Knot | Tail)[] = [new Knot(head)];
  for (let i = 0; i < 7; i++) knots.push(new Knot(knots[knots.length - 1]));
  knots.push(new Tail(knots[knots.length - 1]));
  console.log(`knots: ${knots.length}`);

  const commands = input.split(/\r?\n/).map(parseCommand);
  commands.forEach(({ direction, numberOfMoves }) => {
    handleMove(direction, numberOfMoves, head, knots);
  });

  assertEquals(knots[knots.length - 1].uniquePositions.length, 36);
});
