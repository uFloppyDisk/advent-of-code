import { readInput } from '@utils/input';

export type ParsedInput = [string, string][];
type ReturnPartOne = unknown;
type ReturnPartTwo = unknown;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);
  const inputNoNewlines = input.replaceAll('\n', '');
  const ranges = inputNoNewlines.split(',');

  const parsedRanges = [];
  for (const range of ranges) {
    const split = range
      .split('-')
      .map(n => parseInt(n).toString()) as ParsedInput[number];

    parsedRanges.push(split);
  }

  return parsedRanges;
}

export function part1(input: ParsedInput): ReturnPartOne {
  function hasSymmetry(num: string): boolean {
    if (num.length % 2 !== 0) return false;

    const middle = num.length / 2;

    const start = num.slice(0, middle);
    const end = num.slice(middle);
    if (start === end) return true;

    return false;
  }

  let sum = 0;
  for (const range of input) {
    const start = parseInt(range[0]);
    const end = parseInt(range[1]);

    for (let i = start; i <= end; ++i) {
      const isRepeating = hasSymmetry(i.toString());
      if (isRepeating) sum += i;
    }
  }

  return sum;
}

export function part2(input: ParsedInput): ReturnPartTwo {
  return;
}

export default function(): unknown {
  const INPUT = parseInput();

  return { part1: part1(INPUT), part2: part2(INPUT) };
}
