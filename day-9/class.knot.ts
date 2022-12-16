import Head from "./class.head.ts";

class Knot {
  x: number;
  y: number;
  previousKnot: Head | Knot;
  uniquePositions: string[];

  constructor(knot: Head | Knot) {
    this.x = 0;
    this.y = 0;
    this.previousKnot = knot;
    this.uniquePositions = [];
  }

  private isTouchingPreviousKnot() {
    return (
      Math.abs(this.previousKnot.x - this.x) <= 1 &&
      Math.abs(this.y - this.previousKnot.y) <= 1
    );
  }

  private requiresDiagonalMove() {
    return (
      !this.isTouchingPreviousKnot() &&
      this.previousKnot.x !== this.x &&
      this.previousKnot.y !== this.y
    );
  }

  private moveDiagonally() {
    if (this.previousKnot.x > this.x) {
      this.x++;
    } else {
      this.x--;
    }

    if (this.previousKnot.y > this.y) {
      this.y++;
    } else {
      this.y--;
    }
  }

  follow() {
    if (this.requiresDiagonalMove()) {
      this.moveDiagonally();
      // we need a diagonal move
    } else if (this.previousKnot.x - this.x > 1) {
      this.x++;
    } else if (this.x - this.previousKnot.x > 1) {
      this.x--;
    } else if (this.previousKnot.y - this.y > 1) {
      this.y++;
    } else if (this.y - this.previousKnot.y > 1) {
      this.y--;
    }
    const position = `${this.x},${this.y}`;
    if (!this.uniquePositions.includes(position)) {
      this.uniquePositions.push(position);
    }
  }
}

export default Knot;
