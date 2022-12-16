export interface Command {
  name: string;
  args?: number;
}

const parseCommands = (input: string): Command[] =>
  input.split(/\r?\n/).map((line) => {
    const [name, ...args] = line.split(" ");
    return {
      name,
      args: args.length ? parseInt(args[0]) : undefined,
    };
  });

export { parseCommands };
