import {readInput} from '@utils/input';

type ParsedInput = {result: number; nums: number[]}[];
type ReturnPartOne = unknown;
type ReturnPartTwo = unknown;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);

  const ret: ParsedInput = [];
  for (const line of input.split('\n')) {
    const parts = line.match(/(\d{1,}):(.*)/);

    if (!parts) continue;
    if (!parts[1] || !parts[2]) continue;

    ret.push({
      result: parseInt(parts[1]),
      nums: parts[2]
        .trim()
        .split(' ')
        .map(s => parseInt(s)),
    });
  }

  return ret;
}

export function part1(input: ParsedInput): ReturnPartOne {
  function hasValidP(nums: number[], target: number, at: number): boolean {
    if (nums.length <= 0) return target === at;

    const sliced = nums.slice(1);
    return (
      hasValidP(sliced, target, nums[0] + at) ||
      hasValidP(sliced, target, nums[0] * at)
    );
  }

  let sum = 0;
  for (const {result, nums} of input) {
    if (!hasValidP(nums, result, 0)) continue;

    sum += result;
  }
  return sum;
}

export function part2(input: ParsedInput): ReturnPartTwo {
  function hasValidP(nums: number[], target: number, at: number): boolean {
    if (nums.length <= 0) return target === at;

    const sliced = nums.slice(1);
    return (
      hasValidP(sliced, target, nums[0] + at) ||
      hasValidP(sliced, target, nums[0] * at) ||
      hasValidP(sliced, target, parseInt(at.toString() + nums[0].toString()))
    );
  }

  let sum = 0;
  for (const {result, nums} of input) {
    if (!hasValidP(nums, result, 0)) continue;

    sum += result;
  }
  return sum;
}

export default function (): unknown {
  const INPUT = parseInput();

  return {part1: part1(INPUT), part2: part2(INPUT)};
}
