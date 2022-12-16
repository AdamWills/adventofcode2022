export type Direction = "U" | "D" | "L" | "R";

export interface Command {
  direction: Direction;
  numberOfMoves: number;
}
