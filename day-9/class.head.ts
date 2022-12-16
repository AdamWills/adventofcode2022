import type { Direction } from "./types.d.ts";

class Head {
  x: number;
  y: number;
  constructor() {
    this.x = 0;
    this.y = 0;
  }

  // primarily used for testing
  set(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  move(direction: Direction) {
    switch (direction) {
      case "U":
        this.y++;
        break;
      case "D":
        this.y--;
        break;
      case "L":
        this.x--;
        break;
      case "R":
        this.x++;
        break;
    }
  }
}

export default Head;
