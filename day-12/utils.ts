interface Mapping {
  [k: string]: number;
}

export interface Map {
  [k: string]: Mapping;
}

const convertCharToNumber = (char: string) => {
  if (char === "S") return 0;
  if (char === "E") return 27;
  return char.charCodeAt(0) - 96;
};

const getKeyFromCoordinates = (x: number, y: number, value: number) => {
  if (value === 0) return "start";
  if (value === 27) return "end";
  return `${x}x${y}`;
};

const canClimb = (
  currentValue: number,
  neighbourValue: number | undefined,
): boolean => {
  return neighbourValue !== undefined && neighbourValue - currentValue <= 1;
};

const getNeighbours = (matrix: number[][], x: number, y: number): Mapping => {
  const currentValue = matrix[y][x];
  const neighbours: Mapping = {};
  // check left neighbour
  if (canClimb(currentValue, matrix[y][x - 1])) {
    neighbours[getKeyFromCoordinates(x - 1, y, matrix[y][x - 1])] = 1;
  }
  // check right neighbour
  if (canClimb(currentValue, matrix[y][x + 1])) {
    neighbours[getKeyFromCoordinates(x + 1, y, matrix[y][x + 1])] = 1;
  }
  // check top neighbour
  if (matrix[y - 1] && canClimb(currentValue, matrix[y - 1][x])) {
    neighbours[getKeyFromCoordinates(x, y - 1, matrix[y - 1][x])] = 1;
  }
  // check bottom neighbour
  if (matrix[y + 1] && canClimb(currentValue, matrix[y + 1][x])) {
    neighbours[getKeyFromCoordinates(x, y + 1, matrix[y + 1][x])] = 1;
  }
  return neighbours;
};

const convertInputToMap = (input: string): Map => {
  const matrix = input.split(/\r?\n/).map((line) =>
    line.split("").map(convertCharToNumber)
  );
  const map: Map = {};
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      const key = getKeyFromCoordinates(x, y, matrix[y][x]);
      const neighbours = getNeighbours(matrix, x, y);
      map[key] = neighbours;
    }
  }

  if (Object.keys(map).length !== (matrix.length * matrix[0].length)) {
    throw new Error("There were some values that were not unique");
  }

  return map;
};

const findShortestPath = (
  map: Map,
  startNodeKey: string,
  endNodeKey: string,
): number => {
  const unvisited: string[] = [];
  const visited: string[] = [];
  const distances: {
    [k: string]: { shortestDistance: number; previous: string | undefined };
  } = {};
  Object.keys(map).forEach((key) => {
    if (key === startNodeKey) {
      distances[key] = { shortestDistance: 0, previous: undefined };
      unvisited.unshift(key);
    } else {
      distances[key] = { shortestDistance: Infinity, previous: undefined };
      unvisited.push(key);
    }
  });

  while (unvisited.length > 0) {
    const currentNode = unvisited.shift();
    if (currentNode === undefined) {
      throw new Error("Current node is undefined");
    }

    Object.keys(map[currentNode]).forEach((key) => {
      const distanceFromStart = distances[currentNode].shortestDistance +
        map[currentNode][key];
      if (distanceFromStart < distances[key].shortestDistance) {
        distances[key].shortestDistance = distanceFromStart;
        distances[key].previous = currentNode;
      }
      visited.push(currentNode);
    });

    // reordering unvisited
    unvisited.sort((a, b) => {
      return distances[a].shortestDistance - distances[b].shortestDistance;
    });
  }

  return distances[endNodeKey].shortestDistance;
};

export { convertInputToMap, findShortestPath };
