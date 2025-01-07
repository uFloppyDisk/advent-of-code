import * as day from '.';

it('exists', () => {
  expect(day.default).toBeDefined();
});

describe('part1', () => {
  it('test case is 41', () => {
    const INPUT = day.parseInput({path: '/example.txt'});
    expect(day.part1(INPUT)).toBe(41);
  });

  it('problem case is correct', () => {
    const INPUT = day.parseInput();
    const result = day.part1(INPUT);

    expect(result).toBe(5153);
  });
});

describe('part2', () => {
  it('test case is 6', () => {
    const INPUT = day.parseInput({path: '/example.txt'});
    expect(day.part2(INPUT)).toBe(6);
  });

  it('problem case is correct', () => {
    const INPUT = day.parseInput();
    const result = day.part2(INPUT);

    expect(result).toBe(1711);
  });
});
