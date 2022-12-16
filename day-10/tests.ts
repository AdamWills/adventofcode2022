import { assertEquals } from "https://deno.land/std@0.157.0/testing/asserts.ts";
import CPU from "./class.cpu.ts";
import CPU_Recorder from "./class.cpu-recorder.ts";
import { parseCommands } from "./utils.ts";

Deno.test("Test small program", () => {
  const cpu = new CPU();
  cpu.noop();
  assertEquals(cpu.cycle, 1);
  assertEquals(cpu.X, 1);
  cpu.addx(3);
  assertEquals(cpu.cycle, 3);
  assertEquals(cpu.X, 4);
  cpu.addx(-5);
  assertEquals(cpu.cycle, 5);
  assertEquals(cpu.X, -1);
});

Deno.test("Running small program", () => {
  const input = `noop
addx 3
addx -5`;
  const commands = parseCommands(input);
  const cpu = new CPU();

  cpu.run(commands);
  assertEquals(cpu.cycle, 5);
  assertEquals(cpu.X, -1);
});

Deno.test("CPU Recorder - should record", () => {
  const cpuRecorder = new CPU_Recorder();
  assertEquals(cpuRecorder.shouldRecordCycle(20), true);
  assertEquals(cpuRecorder.shouldRecordCycle(21), false);
  assertEquals(cpuRecorder.shouldRecordCycle(40), false);
  assertEquals(cpuRecorder.shouldRecordCycle(60), true);
  assertEquals(cpuRecorder.shouldRecordCycle(80), false);
  assertEquals(cpuRecorder.shouldRecordCycle(100), true);
  assertEquals(cpuRecorder.shouldRecordCycle(140), true);
  assertEquals(cpuRecorder.shouldRecordCycle(180), true);
  assertEquals(cpuRecorder.shouldRecordCycle(220), true);
});

Deno.test("Large program", async () => {
  const input = await Deno.readTextFile("test.txt");
  const commands = parseCommands(input);
  const recorder = new CPU_Recorder();
  const cpu = new CPU(recorder);
  cpu.run(commands);
  assertEquals(recorder.getTotalSignalStrength(), 13140);
});

Deno.test(`Drawing`, () => {
  const recorder = new CPU_Recorder();
  const cpu = new CPU(recorder);
  cpu.run([{ name: "addx", args: 15 }]);
  assertEquals(recorder.getDrawing(), "##");
  cpu.run([{ name: "addx", args: -11 }]);
  assertEquals(recorder.getDrawing(), "##..");
  cpu.run([{ name: "addx", args: 6 }]);
  assertEquals(recorder.getDrawing(), "##..##");
  cpu.run([{ name: "addx", args: -3 }]);
  assertEquals(recorder.getDrawing(), "##..##..");
});

Deno.test("Large program drawing", async () => {
  const input = await Deno.readTextFile("test.txt");
  const commands = parseCommands(input);
  const recorder = new CPU_Recorder();
  const cpu = new CPU(recorder);
  cpu.run(commands);
  const expectedOutput = `##..##..##..##..##..##..##..##..##..##..
###...###...###...###...###...###...###.
####....####....####....####....####....
#####.....#####.....#####.....#####.....
######......######......######......####
#######.......#######.......#######.....`;
  assertEquals(recorder.getDrawing(), expectedOutput);
});
