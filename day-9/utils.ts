import Head from "./class.head.ts";
import Knot from "./class.knot.ts";
import Tail from "./class.tail.ts";
import type { Command, Direction } from "./types.d.ts";

const handleMove = (
  direction: Direction,
  numberOfMoves: number,
  head: Head,
  knots: (Knot | Tail)[],
): void => {
  for (let i = 0; i < numberOfMoves; i++) {
    head.move(direction);
    knots.forEach((knot) => knot.follow());
  }
};

const parseCommand = (command: string): Command => {
  const [direction, numberOfMoves] = command.split(" ");
  if (!["U", "D", "L", "R"].includes(direction)) {
    throw new Error(`Invalid direction: ${direction}`);
  }
  return {
    direction: direction as Direction,
    numberOfMoves: parseInt(numberOfMoves),
  };
};

export { handleMove, parseCommand };
