export interface CPU_Recording {
  cycle: number;
  signalStrength: number;
}

class CPU_Recorder {
  signalStrengthRecords: CPU_Recording[];
  spritePosition: number;
  drawing: string[][];
  debug: boolean;

  constructor(debug: boolean = false) {
    this.signalStrengthRecords = [];
    this.drawing = [[]];
    this.spritePosition = 0;
    this.debug = debug;
  }

  shouldRecordCycle(cycle: number): boolean {
    // return true for the 20th cycle and every 40th cycle after that
    return cycle === 20 || (cycle - 20) % 40 === 0;
  }

  private calculateSignalStrength(cycle: number, xValue: number): number {
    return cycle * xValue;
  }

  updateSprite(xValue: number): void {
    this.spritePosition += xValue;
  }

  getCharToDraw(newPosition: number): string {
    return (newPosition >= this.spritePosition &&
        newPosition < this.spritePosition + 3)
      ? "#"
      : ".";
  }

  doDrawing(xValue: number, cycle: number): void {
    if (this.debug) {
      console.log(`CRT draws pixel in position ${this.spritePosition}`);
    }
    const currentLine = this.drawing.length - 1;
    const charToDraw = this.getCharToDraw(this.drawing[currentLine].length);
    this.drawing[currentLine].push(charToDraw);
    if (this.debug) {
      console.log(`Current CRT row: ${this.drawing[currentLine]}`);
    }
    if (cycle % 40 === 0) {
      this.drawing.push([]);
    }
  }

  maybeRecordCycle(cycle: number, xValue: number) {
    if (this.shouldRecordCycle(cycle)) {
      this.signalStrengthRecords.push(
        {
          cycle,
          signalStrength: this.calculateSignalStrength(cycle, xValue),
        },
      );
    }

    this.doDrawing(xValue, cycle);
  }

  getDrawing(): string {
    const output = this.drawing
      .filter((line) => line.length)
      .map((line) => line.join(""))
      .join("\n");
    return output;
  }

  getTotalSignalStrength(): number {
    return this.signalStrengthRecords.reduce(
      (total, { signalStrength }) => total + signalStrength,
      0,
    );
  }
}

export default CPU_Recorder;
