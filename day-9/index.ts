import Head from "./class.head.ts";
import Knot from "./class.knot.ts";
import Tail from "./class.tail.ts";
import { handleMove, parseCommand } from "./utils.ts";

const head = new Head();
const tail = new Tail(head);

const input = await Deno.readTextFile("input.txt");
const commands = input.split(/\r?\n/).map(parseCommand);
commands.forEach(({ direction, numberOfMoves }) => {
  handleMove(direction, numberOfMoves, head, [tail]);
});

console.log("Part A:", tail.uniquePositions.length);

// Part B
const headB = new Head();
const knots: (Knot | Tail)[] = [new Knot(headB)];
for (let i = 0; i < 7; i++) knots.push(new Knot(knots[knots.length - 1]));
knots.push(new Tail(knots[knots.length - 1]));

commands.forEach(({ direction, numberOfMoves }) => {
  handleMove(direction, numberOfMoves, headB, knots);
});

console.log("Part B:", knots[knots.length - 1].uniquePositions.length);
