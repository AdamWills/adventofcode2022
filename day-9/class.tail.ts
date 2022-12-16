import Head from "./class.head.ts";
import Knot from "./class.knot.ts";

class Tail extends Knot {
  uniquePositions: string[];

  constructor(knot: Head | Knot) {
    super(knot);
    this.uniquePositions = [];
  }

  follow() {
    super.follow();
    const position = `${this.x},${this.y}`;
    if (!this.uniquePositions.includes(position)) {
      this.uniquePositions.push(position);
    }
  }
}

export default Tail;
