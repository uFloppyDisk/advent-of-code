import {readInput} from '@utils/input';

type ParsedInput = {map: string[][]; start: [number, number]};
type ReturnPartOne = number;
type ReturnPartTwo = number;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);

  let start: [number, number];
  const map = [];
  for (const line of input.split('\n')) {
    const points = line.split('');
    if (points.length <= 0) continue;
    map.push(points);

    for (let i = 0; i < points.length; ++i) {
      if (points[i] === '^') {
        start = [i, map.length - 1];
        map[map.length - 1][i] = '.';
      }
    }
  }

  return {map, start: start!};
}

const dirs = [
  [0, -1],
  [1, 0],
  [0, 1],
  [-1, 0],
];

export function part1({map, start}: ParsedInput): ReturnPartOne {
  const curPos = start;
  let curDir = 0;

  let countDistinct = 0;
  while (
    curPos[0] >= 0 &&
    curPos[1] >= 0 &&
    curPos[0] < map[0].length &&
    curPos[1] < map.length
  ) {
    const dir = dirs[curDir];

    if (map[curPos[1]][curPos[0]] === '.') {
      countDistinct++;
      map[curPos[1]][curPos[0]] = 'X';
    }

    const nextPos = [curPos[0] + dir[0], curPos[1] + dir[1]];
    const next = map[nextPos[1]]?.[nextPos[0]] ?? undefined;
    if (next === '#') {
      curDir = (curDir + 1) % dirs.length;
      continue;
    }

    curPos[0] = nextPos[0];
    curPos[1] = nextPos[1];
  }

  return countDistinct;
}

// http://szudzik.com/ElegantPairing.pdf by Matthew Szudzik
function hash([x, y]: number[]): number {
  return x >= y ? x * x + x + y : x + y * y;
}

export function part2({map, start}: ParsedInput): ReturnPartTwo {
  const visited = [];

  {
    const curPos = [start[0], start[1]];
    let curDir = 0;
    while (
      curPos[0] >= 0 &&
      curPos[1] >= 0 &&
      curPos[0] < map[0].length &&
      curPos[1] < map.length
    ) {
      const dir = dirs[curDir];

      if (map[curPos[1]][curPos[0]] === '.') {
        visited.push([curPos[0], curPos[1]]);
        map[curPos[1]][curPos[0]] = 'X';
      }

      const nextPos = [curPos[0] + dir[0], curPos[1] + dir[1]];
      const next = map[nextPos[1]]?.[nextPos[0]] ?? undefined;
      if (next === '#') {
        curDir = (curDir + 1) % dirs.length;
        continue;
      }

      curPos[0] = nextPos[0];
      curPos[1] = nextPos[1];
    }
  }

  let countLoop = 0;
  for (const test of visited) {
    let hasLoop = false;

    const incidents = new Map();
    const curPos = [start[0], start[1]];
    let curDir = 0;

    map[test[1]][test[0]] = '#';

    while (
      curPos[0] >= 0 &&
      curPos[1] >= 0 &&
      curPos[0] < map[0].length &&
      curPos[1] < map.length
    ) {
      const dir = dirs[curDir];

      const nextPos = [curPos[0] + dir[0], curPos[1] + dir[1]];
      const next = map[nextPos[1]]?.[nextPos[0]] ?? undefined;
      if (next === '#') {
        const hashed = hash(nextPos);
        if (incidents.get(hashed) === curDir) {
          hasLoop = true;
          break;
        }

        incidents.set(hashed, curDir);
        curDir = (curDir + 1) % dirs.length;
        continue;
      }

      curPos[0] = nextPos[0];
      curPos[1] = nextPos[1];
    }

    map[test[1]][test[0]] = 'X';
    hasLoop ? countLoop++ : null;
  }

  return countLoop;
}

export default function (): unknown {
  const INPUT = parseInput();

  return {part1: part1(INPUT), part2: part2(INPUT)};
}
