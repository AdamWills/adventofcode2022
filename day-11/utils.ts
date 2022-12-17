import Monkey from "./class.monkey.ts";

const getLevelOfMonkeyBusiness = (monkeys: Monkey[]): number => {
  const inspectionCounts = monkeys.map((monkey) => monkey.inspectionCount);
  inspectionCounts.sort((a, b) => b - a);
  return inspectionCounts[0] * inspectionCounts[1];
};

const partAReduceWorry = (x: number) => Math.floor(x / 3);

const partBReduceWorry = (modulo: number) => (x: number) => {
  return x % modulo;
};

const getModulo = (monkeys: Monkey[]): number =>
  monkeys.reduce((acc, monkey) => {
    return acc * monkey.testDivisor;
  }, 1);

export {
  getLevelOfMonkeyBusiness,
  getModulo,
  partAReduceWorry,
  partBReduceWorry,
};
