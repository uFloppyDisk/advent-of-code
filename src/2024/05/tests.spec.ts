import * as day from '.';

it('exists', () => {
  expect(day.default).toBeDefined();
});

describe('part1', () => {
  it('test case is 143', () => {
    const INPUT = day.parseInput({path: '/example.txt'});
    expect(day.part1(INPUT)).toBe(143);
  });

  it('problem case is correct', () => {
    const INPUT = day.parseInput();
    expect(day.part1(INPUT)).toBe(5129);
  });
});

describe('part2', () => {
  it('test case is 123', () => {
    const INPUT = day.parseInput({path: '/example.txt'});
    expect(day.part2(INPUT)).toBe(123);
  });

  it('problem case is correct', () => {
    const INPUT = day.parseInput();
    expect(day.part2(INPUT)).toBe(4077);
  });
});
