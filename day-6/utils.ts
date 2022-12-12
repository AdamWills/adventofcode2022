const hasUniqueValues = (input: string[]): boolean => {
  const set = new Set(input);
  return set.size === input.length;
};

const getFirstMarker = (input: string, lengthOfMarker: number): number => {
  let marker = input.split("").slice(0, lengthOfMarker);
  let i = 0;
  while (!hasUniqueValues(marker)) {
    marker = input.split("").slice(i, i + lengthOfMarker);
    i++;
  }
  return i + lengthOfMarker - 1;
};

export { getFirstMarker };
