import {readInput} from '@utils/input';

export type ParsedInput = {rules: number[][]; updates: number[][]};
type ReturnPartOne = number;
type ReturnPartTwo = unknown;

export function parseInput(overrides?: InputOverride): ParsedInput {
  const input = readInput(overrides);

  const ret: ParsedInput = {rules: [], updates: []};
  for (const raw of input.split('\n')) {
    const line = raw.trim();
    if (line.includes('|')) {
      ret.rules.push(line.split('|').map(s => parseInt(s)));
    } else if (line.includes(',')) {
      ret.updates.push(line.split(',').map(s => parseInt(s)));
    }
  }

  return ret;
}

type Lookup = Map<number, {before: number[]}>;
function createLookup(rules: ParsedInput['rules']): Lookup {
  const lookup: Lookup = new Map();
  for (const rule of rules) {
    const l0 = lookup.get(rule[0]);
    lookup.set(rule[0], {
      before: l0?.before ? [...l0.before, rule[1]] : [rule[1]],
    });
  }

  return lookup;
}

type CategorizedUpdates = {valid: number[][]; invalid: number[][]};
function categorize(
  updates: ParsedInput['updates'],
  lookup: Lookup,
): CategorizedUpdates {
  const cat: CategorizedUpdates = {valid: [], invalid: []};
  for (const update of updates) {
    const found = new Set();

    let isValid = true;
    for (let i = 0; i < update.length; ++i) {
      const current = update[i];
      const look = lookup.get(current);
      found.add(current);

      if (!look) continue;
      for (const c of look.before) {
        if (found.has(c)) {
          isValid = false;
          break;
        }
      }
    }

    (isValid ? cat.valid : cat.invalid).push(update);
  }

  return cat;
}

export function part1(input: ParsedInput): ReturnPartOne {
  const lookup: Lookup = createLookup(input.rules);
  const {valid} = categorize(input.updates, lookup);

  let sum = 0;
  for (const update of valid) {
    sum += update[Math.floor(update.length / 2)];
  }

  return sum;
}

export function part2(input: ParsedInput): ReturnPartTwo {
  const lookup: Lookup = createLookup(input.rules);
  const {invalid} = categorize(input.updates, lookup);

  let sum = 0;
  for (const update of invalid) {
    update.sort((a, b) => {
      const look = lookup.get(a)!;
      if (!look) return 0;
      return look.before.includes(b) ? -1 : 1;
    });

    sum += update[Math.floor(update.length / 2)];
  }

  return sum;
}

export default function (): unknown {
  const INPUT = parseInput();

  return {part1: part1(INPUT), part2: part2(INPUT)};
}
