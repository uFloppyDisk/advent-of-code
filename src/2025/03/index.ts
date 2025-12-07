import {readInput} from '@utils/input';

export type ParsedInput = string[];
type ReturnPartOne = unknown;
type ReturnPartTwo = unknown;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);
  const parsedInput = input.trim().split('\n');

  return parsedInput;
}

export function part1(input: ParsedInput): ReturnPartOne {
  let sum = 0;

  for (const bank of input) {
    let lMax = 0;
    let lMaxIndex = 0;
    for (let i = 0; i < bank.length - 1; ++i) {
      if (lMax === 9) break;

      const cur = parseInt(bank[i]);
      if (cur > lMax) {
        lMax = cur;
        lMaxIndex = i;
      }
    }

    let rMax = 0;
    for (let i = bank.length - 1; i > lMaxIndex; --i) {
      const cur = parseInt(bank[i]);
      if (cur > rMax) {
        rMax = cur;
      }
    }

    sum += parseInt(lMax.toString() + rMax.toString());
  }

  return sum;
}

export function part2(input: ParsedInput): ReturnPartTwo {
  return;
}

export default function (): unknown {
  const INPUT = parseInput();

  return {part1: part1(INPUT), part2: part2(INPUT)};
}
