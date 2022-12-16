import CPU from "./class.cpu.ts";
import CPU_Recorder from "./class.cpu-recorder.ts";
import { parseCommands } from "./utils.ts";

const input = await Deno.readTextFile("input.txt");
const commands = parseCommands(input);
const recorder = new CPU_Recorder();
const cpu = new CPU(recorder);
cpu.run(commands);
console.log("Part A", recorder.getTotalSignalStrength());

console.log("Part B");
console.log(recorder.getDrawing());
