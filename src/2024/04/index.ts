import {readFileSync} from 'fs';

type Input = string[][];

function readInput(): Input {
  const file = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
  });

  const ret: Input = [];
  for (const line of file.split('\n')) {
    const s = line.split('');
    if (s.length <= 0) continue;

    ret.push(s);
  }

  return ret;
}

const adj = [null, 'X', 'M', 'A', 'S', null];

const matrix = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

function checkAdj(
  lines: Input,
  pos: number[],
  dir: number[],
  ap: number,
  step: number,
): boolean {
  ap = ap + step;
  if (adj[ap] === null) return true;

  const [x, y] = [pos[0] + dir[0], pos[1] + dir[1]];
  if (y < 0 || y >= lines.length) return false;
  if (x < 0 || x >= lines[y].length) return false;

  if (lines[y][x] === adj[ap]) {
    return checkAdj(lines, [x, y], dir, ap, step);
  }

  return false;
}

function part1(lines: Input) {
  let total = 0;

  for (let li = 0; li < lines.length; ++li) {
    for (let ci = 0; ci < lines[li].length; ++ci) {
      const char = lines[li][ci];
      const adjIndex = adj.findIndex(s => s === char);

      for (const dir of matrix) {
        const left = checkAdj(lines, [ci, li], dir, adjIndex, -1);
        const right = checkAdj(lines, [ci, li], dir, adjIndex, 1);

        if (left && right) {
          total += 1;
          continue;
        }
      }
    }
  }

  return total / 2;
}

export default function (): unknown {
  const INPUT = readInput();

  return {part1: part1(INPUT)};
}
