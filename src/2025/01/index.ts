import { readInput } from '@utils/input';

export type ParsedInput = [string, number][];
type ReturnPartOne = unknown;
type ReturnPartTwo = unknown;

const START_NUM = 50;
const WRAP_BOUND = 100;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);

  const steps = [];
  for (const line of input.split('\n')) {
    steps.push([line[0], parseInt(line.slice(1))]);
  }

  return steps as ParsedInput;
}

export function part1(input: ParsedInput): ReturnPartOne {
  let amountOfZeros = 0;

  let pos = START_NUM;
  for (const [dir, num] of input) {
    const offset = num * (dir === 'L' ? -1 : 1);
    pos = (pos + WRAP_BOUND + offset) % WRAP_BOUND;

    if (pos === 0) amountOfZeros++;
  }

  return amountOfZeros;
}

export function part2(input: ParsedInput): ReturnPartTwo {
  return;
}

export default function(): unknown {
  const INPUT = parseInput();

  return { part1: part1(INPUT), part2: part2(INPUT) };
}
