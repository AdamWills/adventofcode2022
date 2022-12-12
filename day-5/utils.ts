const parseStackLine = (line: string): string[] => {
  return (
    line
      .match(/(\[([A-Z])\])|\s{4}/g)
      ?.map((part) => part.replace(/\[|\]/g, "").trim()) ?? []
  );
};

interface Procedure {
  pieces: number;
  from: number;
  to: number;
}

const parseProcedureLine = (line: string): Procedure => {
  const [pieces, from, to] =
    line.match(/(\d+)/g)?.map((part) => parseInt(part)) ?? [];

  return { pieces, from, to };
};

const parseFile = (
  input: string
): { stacks: string[][]; procedures: Procedure[] } => {
  const lines = input.split(/\r?\n/);
  const stacks = lines
    .filter((line) => line.match(/\[([A-Z])\]/g))
    .map(parseStackLine);
  const procedures = lines
    .filter((line) => line.match(/move/))
    .map(parseProcedureLine);
  return { stacks, procedures };
};

const transformStacks = (stacks: string[][]): string[][] => {
  const transformedStacks = [] as string[][];
  // loop through stacks in reverse order
  for (
    let stackIndex = stacks.length - 1, i = 0;
    stackIndex >= 0;
    stackIndex--, i++
  ) {
    for (
      let pieceIndex = 0;
      pieceIndex < stacks[stackIndex].length;
      pieceIndex++
    ) {
      if (!transformedStacks[pieceIndex]) {
        transformedStacks[pieceIndex] = [];
      }
      if (stacks[stackIndex][pieceIndex] !== "") {
        transformedStacks[pieceIndex][i] = stacks[stackIndex][pieceIndex];
      }
    }
  }
  return transformedStacks;
};

const applyProcedure = (
  stacks: string[][],
  procedure: Procedure,
  supportsMultiplePieces = false
): string[][] => {
  const { pieces, from, to } = procedure;
  if (supportsMultiplePieces) {
    const piecesToMove = stacks[from - 1].splice(-pieces);
    stacks[to - 1].push(...piecesToMove);
    return stacks;
  }
  for (let i = 0; i < pieces; i++) {
    stacks[to - 1].push(stacks[from - 1].pop() ?? "");
  }
  return stacks;
};

const getTopCrates = (stacks: string[][]): string => {
  return stacks
    .map((stack) => stack[stack.length - 1])
    .filter((crate) => crate)
    .join("");
};

const calculateTopCratesFromInput = (
  input: string,
  supportsMultiplePieces = false
): string => {
  const { stacks, procedures } = parseFile(input);
  const transformedStacks = transformStacks(stacks);
  const appliedProcedures = procedures.reduce(
    (stacks, procedure) =>
      applyProcedure(stacks, procedure, supportsMultiplePieces),
    transformedStacks
  );
  return getTopCrates(appliedProcedures);
};

export {
  applyProcedure,
  parseStackLine,
  parseProcedureLine,
  parseFile,
  transformStacks,
  getTopCrates,
  calculateTopCratesFromInput,
};
