const parseInput = (input: string): number[][] => {
  return input.split(/\r?\n/).map((line) => {
    return line.split("").map((num) => parseInt(num, 10));
  });
};

const compareValues = (value: number, range: number[]): boolean => {
  return value > Math.max(...range);
};

const getTreesToTheLeft = (
  matrix: number[][],
  x: number,
  y: number,
): number[] => matrix[y].slice(0, x);
const getTreesToTheRight = (
  matrix: number[][],
  x: number,
  y: number,
): number[] => matrix[y].slice(x + 1);
const getTreesToTheTop = (matrix: number[][], x: number, y: number): number[] =>
  matrix.slice(0, y).map((row) => row[x]);
const getTreesToTheBottom = (
  matrix: number[][],
  x: number,
  y: number,
): number[] => matrix.slice(y + 1).map((row) => row[x]);

const isVisibleFromLeft = (
  matrix: number[][],
  x: number,
  y: number,
): boolean => {
  return compareValues(matrix[y][x], getTreesToTheLeft(matrix, x, y));
};

const isVisibleFromRight = (
  matrix: number[][],
  x: number,
  y: number,
): boolean => {
  return compareValues(matrix[y][x], getTreesToTheRight(matrix, x, y));
};

const isVisibleFromTop = (
  matrix: number[][],
  x: number,
  y: number,
): boolean => {
  return compareValues(matrix[y][x], getTreesToTheTop(matrix, x, y));
};

const isVisibleFromBottom = (
  matrix: number[][],
  x: number,
  y: number,
): boolean => {
  return compareValues(matrix[y][x], getTreesToTheBottom(matrix, x, y));
};

const isVisible = (matrix: number[][], x: number, y: number) =>
  isVisibleFromLeft(matrix, x, y) || isVisibleFromRight(matrix, x, y) ||
  isVisibleFromTop(matrix, x, y) || isVisibleFromBottom(matrix, x, y);

const getVisibleTrees = (input: string): number => {
  const matrix = parseInput(input);
  const width = matrix[0].length;
  const height = matrix.length;

  const visibleTrees = [];
  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      if (isVisible(matrix, x, y)) {
        visibleTrees.push(`${x},${y}`);
      }
    }
  }

  const rows = matrix[0].length;
  const columns = matrix.length;
  return visibleTrees.length + (columns * 2) + ((rows - 2) * 2);
};

const getScenicScore = (x: number, y: number, matrix: number[][]): number => {
  const val = matrix[y][x];
  const rowsAndColumns = [
    getTreesToTheTop(matrix, x, y).reverse(),
    getTreesToTheRight(matrix, x, y),
    getTreesToTheBottom(matrix, x, y),
    getTreesToTheLeft(matrix, x, y).reverse(),
  ];

  const rowScores = rowsAndColumns.map((row) => {
    let i = 0;
    let rowScore = 1;
    while (row[i] < val) {
      rowScore++;
      i++;
    }
    if (rowScore === row.length + 1) {
      rowScore--;
    }
    return rowScore;
  });

  const totalScenicScore = rowScores.reduce((acc, curr) => acc * curr, 1);
  return totalScenicScore;
};

const getHighestScenicScore = (input: string): number => {
  const matrix = parseInput(input);
  const width = matrix[0].length;
  const height = matrix.length;
  let highestScenicScore = 0;

  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const score = getScenicScore(x, y, matrix);
      if (score > highestScenicScore) {
        highestScenicScore = score;
      }
    }
  }
  return highestScenicScore;
};

export {
  getHighestScenicScore,
  getVisibleTrees,
  isVisibleFromBottom,
  isVisibleFromLeft,
  isVisibleFromRight,
  isVisibleFromTop,
  parseInput,
};
