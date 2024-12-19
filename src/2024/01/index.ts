import {readFileSync} from 'fs';
import {resolve} from 'path';

function parseInput() {
  const output = [[], []];
  const file = readFileSync(resolve('./src/2024/01/input.txt'), {
    encoding: 'utf8',
  }).split('\n');

  for (const line of file) {
    const nums = line.split('   ').map(v => parseInt(v));
    if (nums.some(v => isNaN(v) || typeof v === 'undefined')) continue;
    output[0].push(nums[0]);
    output[1].push(nums[1]);
  }

  return output;
}

function part1(left: number[], right: number[]) {
  let index = 0;
  let total = 0;
  while (left.length > index && right.length > index) {
    total += Math.abs(left[index] - right[index]);
    index++;
  }

  return total;
}

function part2(left: number[], right: number[]) {
  const occurances = new Map();

  for (const num of right) {
    const value = occurances.get(num);
    if (!value) {
      occurances.set(num, 1);
      continue;
    }

    occurances.set(num, value + 1);
  }

  let total = 0;
  for (const num of left) {
    total += num * (occurances.get(num) ?? 0);
  }

  return total;
}

export default function () {
  const INPUT = parseInput();

  const left = INPUT[0].sort();
  const right = INPUT[1].sort();

  return {part1: part1(left, right), part2: part2(left, right)};
}
