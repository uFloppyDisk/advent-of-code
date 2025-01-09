import {readInput} from '@utils/input';

export type ParsedInput = unknown;
type ReturnPartOne = unknown;
type ReturnPartTwo = unknown;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);
  return input;
}

export function part1(input: ParsedInput): ReturnPartOne {
  return;
}

export function part2(input: ParsedInput): ReturnPartTwo {
  return;
}

export default function (): unknown {
  const INPUT = parseInput();

  return {part1: part1(INPUT), part2: part2(INPUT)};
}
