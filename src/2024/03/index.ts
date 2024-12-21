import {readFileSync} from 'fs';

function readInput(): unknown {
  const file = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
  });

  return file;
}

function matchAllValid(input: string) {
  return input.matchAll(/mul\(([0-9]{1,3}),([0-9]{1,3})\)/g);
}

function solvePart1(input: string): number {
  const matches = matchAllValid(input);

  let total = 0;
  for (const match of matches) {
    total += parseInt(match[1]) * parseInt(match[2]);
  }

  return total;
}

function solvePart2(input: string): number {
  const splits = input.split("don't()");

  let total = 0;
  for (const [i, s] of splits.entries()) {
    const chunks = s.split('do()');
    const filtered = chunks.slice(i === 0 ? 0 : 1).join();

    const matches = matchAllValid(filtered);

    for (const match of matches) {
      total += parseInt(match[1]) * parseInt(match[2]);
    }
  }

  return total;
}

export default function (): unknown {
  const INPUT = readInput() as string;

  return {part1: solvePart1(INPUT), part2: solvePart2(INPUT)};
}
