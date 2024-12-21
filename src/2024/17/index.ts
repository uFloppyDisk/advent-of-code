import {readFileSync} from 'fs';

type Computer = {
  registers: Map<string, number>;
  ip: number;
  noinc: boolean;
  program: number[];
};

function readInput(): string {
  const file = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
  });

  return file;
}

function parseInput(input: string): Computer {
  const registers = new Map();
  let program: number[] = [];

  const lines = input.split('\n');
  for (const line of lines) {
    if (line.startsWith('Register')) {
      const match = line.match(/Register (.*): (\d*)/);
      if (!match) continue;

      registers.set(match[1], parseInt(match[2]));
    }

    if (line.startsWith('Program')) {
      program = line
        .replace('Program: ', '')
        .split(',')
        .map(s => parseInt(s));

      break;
    }
  }

  return {
    registers,
    program,
    ip: 0,
    noinc: false,
  };
}

const combo: Record<number, (s: Computer) => number> = {
  [0]: () => 0,
  [1]: () => 1,
  [2]: () => 2,
  [3]: () => 3,
  [4]: s => s.registers.get('A') as number,
  [5]: s => s.registers.get('B') as number,
  [6]: s => s.registers.get('C') as number,
};

const ops: Record<number, (s: Computer, v: number) => number[] | void> = {
  // adv
  [0]: (s, v) => {
    const n = combo[4](s);
    const d = 2 ** combo[v](s);

    s.registers.set('A', Math.trunc(n / d));
  },

  // bxl
  [1]: (s, v) => {
    s.registers.set('B', combo[5](s) ^ v);
  },

  // bst
  [2]: (s, v) => {
    s.registers.set('B', combo[v](s) % 8);
  },

  // jnz
  [3]: (s, v) => {
    if (combo[4](s) === 0) return;

    s.ip = v;
    s.noinc = true;
  },

  // bxc
  [4]: s => {
    s.registers.set('B', combo[5](s) ^ combo[6](s));
  },

  // out
  [5]: (s, v) => {
    const out = combo[v](s) % 8;
    return [out];
  },

  // bdv
  [6]: (s, v) => {
    const n = combo[4](s);
    const d = 2 ** combo[v](s);

    s.registers.set('B', Math.trunc(n / d));
  },

  // cdv
  [7]: (s, v) => {
    const n = combo[4](s);
    const d = 2 ** combo[v](s);

    s.registers.set('C', Math.trunc(n / d));
  },
};

function fetch(state: Computer): [number, number] {
  const pair = state.program.slice(state.ip, state.ip + 2);
  if (pair.length !== 2) throw new RangeError(`Invalid operation: ${pair}`);
  if (pair.some(v => v === undefined))
    throw new RangeError(`One or more undefined: ${pair}`);

  return pair as [number, number];
}

function run(state: Computer, maxIterations?: number): number[] {
  maxIterations = maxIterations ?? 2 ** 32;
  const output = [];

  for (let i = 0; i < maxIterations; ++i) {
    if (state.ip >= state.program.length || state.ip < 0) break;
    state.noinc = false;

    const [opcode, operand] = fetch(state);
    const out = ops[opcode](state, operand);

    if (Array.isArray(out)) output.push(out[0]);

    if (!state.noinc) state.ip += 2;
  }

  return output;
}

function part2(oldState: Computer): number {
  const start = 8 ** 15;
  const maxIterations = 8 ** 16 - start;
  for (let i = start; i < maxIterations + start; ++i) {
    const state = structuredClone(oldState);
    state.registers.set('A', i);
    state.ip = 0;

    const output = run(state);
    if (output === state.program) return i;
  }

  return -1;
}

export default function (): unknown {
  const INPUT = readInput();
  const state = parseInput(INPUT);

  return {part1: run(state), part2: part2(state)};
}
