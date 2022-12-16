import type { Command } from "./utils.ts";
import CPU_Recorder from "./class.cpu-recorder.ts";

class CPU {
  cycle: number;
  X: number;
  recorder: CPU_Recorder | null;
  debug: boolean;

  constructor(recorder: CPU_Recorder | null = null, debug = false) {
    this.cycle = 0;
    this.X = 1;
    this.recorder = recorder;
    this.debug = debug;
  }

  noop() {
    this.cycle++;
    if (this.recorder) this.recorder.maybeRecordCycle(this.cycle, this.X);
  }

  addx(x: number) {
    this.cycle++;
    if (this.recorder) this.recorder.maybeRecordCycle(this.cycle, this.X);
    this.cycle++;
    if (this.recorder) this.recorder.maybeRecordCycle(this.cycle, this.X);
    this.X += x;
    if (this.recorder) this.recorder.updateSprite(x);
  }

  run(commands: Command[]) {
    commands.forEach(({ name, args }) => {
      if (this.debug) {
        console.log(
          `Start cycle ${this.cycle + 1}: begin executing ${name} ${args}`,
        );
      }
      if (name === "noop") this.noop();
      if (name === "addx") this.addx(args ?? 0);
    });
  }
}

export default CPU;
