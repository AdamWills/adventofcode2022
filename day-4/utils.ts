const expandSectionFromString = (section: string): number[] => {
  const sectionParts = section.split("-").map((x) => parseInt(x));
  const length = sectionParts[1] - sectionParts[0] + 1;
  return Array.from(
    { length: length },
    (_, i) => i + sectionParts[0],
  );
};

const parseSections = (input: string) => {
  const [firstPair, secondPair] = input.split(",");
  const firstSections = expandSectionFromString(firstPair);
  const secondSections = expandSectionFromString(secondPair);
  return [firstSections, secondSections].sort((a, b) => a.length - b.length);
};

const doAllItemsExist = (x: number[], y: number[]): boolean =>
  x.every((item) => y.includes(item));
const doAnyItemsOverlap = (x: number[], y: number[]): boolean =>
  x.some((item) => y.includes(item));

const calculateOverlappingPairs = (input: string) => {
  const pairs = input.split(/\r?\n/);
  return pairs.reduce((acc, pair) => {
    const sections = parseSections(pair);
    return doAllItemsExist(sections[0], sections[1]) ? acc + 1 : acc;
  }, 0);
};

const calculateAnyOverlappingPairs = (input: string) => {
  const pairs = input.split(/\r?\n/);
  return pairs.reduce((acc, pair) => {
    const sections = parseSections(pair);
    return doAnyItemsOverlap(sections[0], sections[1]) ? acc + 1 : acc;
  }, 0);
};

export { calculateAnyOverlappingPairs, calculateOverlappingPairs };
