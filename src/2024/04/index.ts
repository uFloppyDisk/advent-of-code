import {readFileSync} from 'fs';

type Input = string[][];

function readInput(override?: string): Input {
  const file =
    override ??
    readFileSync(`${__dirname}/input.txt`, {
      encoding: 'utf8',
    });

  const ret: Input = [];
  for (const line of file.split('\n')) {
    const s = line.trim().split('');
    if (s.length <= 0) continue;

    ret.push(s);
  }

  return ret;
}

function checkAdj(
  lines: Input,
  pos: number[],
  dir: number[],
  adj: (string | null)[],
  ap: number,
  step: number,
): boolean {
  ap = ap + step;
  if (adj[ap] === null) return true;

  const [x, y] = [pos[0] + dir[0], pos[1] + dir[1]];
  if (y < 0 || y >= lines.length) return false;
  if (x < 0 || x >= lines[y].length) return false;

  if (lines[y][x] !== adj[ap]) return false;

  return checkAdj(lines, [x, y], dir, adj, ap, step);
}

function part1(lines: Input) {
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

  let total = 0;

  for (let li = 0; li < lines.length; ++li) {
    for (let ci = 0; ci < lines[li].length; ++ci) {
      const char = lines[li][ci];
      const adjIndex = adj.findIndex(s => s === char);

      for (const dir of matrix) {
        const left = checkAdj(lines, [ci, li], dir, adj, adjIndex, -1);
        const right = checkAdj(lines, [ci, li], dir, adj, adjIndex, 1);

        if (left && right) {
          total += 1;
          continue;
        }
      }
    }
  }

  return total / 2;
}

function part2(lines: Input) {
  const adj = [null, 'M', 'A', 'S', null];

  const matrix = [
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
  ];

  let total = 0;

  for (let li = 0; li < lines.length; ++li) {
    for (let ci = 0; ci < lines[li].length; ++ci) {
      const char = lines[li][ci];
      if ('A' !== char) continue;
      const adjIndex = adj.findIndex(s => s === char);

      let isFound = true;
      for (let index = 0; index < matrix.length; index += 2) {
        const dir = matrix[index];
        const oppDir = matrix[index + 1];

        const left = checkAdj(lines, [ci, li], dir, adj, adjIndex, -1);
        if (left) {
          const opp = checkAdj(lines, [ci, li], oppDir, adj, adjIndex, 1);
          if (opp) continue;
        }

        const right = checkAdj(lines, [ci, li], dir, adj, adjIndex, 1);
        if (right) {
          const opp = checkAdj(lines, [ci, li], oppDir, adj, adjIndex, -1);
          if (opp) continue;
        }

        isFound = false;
        break;
      }

      if (isFound) total += 1;
    }
  }

  return total;
}

export default function (): unknown {
  const INPUT = readInput();

  return {part1: part1(INPUT), part2: part2(INPUT)};
}
