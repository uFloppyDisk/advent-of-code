import * as day from '.';

describe('example case', () => {
  let INPUT: day.ParsedInput;
  beforeEach(() => {
    INPUT = day.parseInput({ path: '/example.txt' });
  });

  it.each([3])('part1 is %s', expected => {
    expect(day.part1(INPUT)).toEqual(expected);
  });

  it.skip.each([6])('part2 is %s', expected => {
    expect(day.part2(INPUT)).toEqual(expected);
  });
});

describe.skip('problem case', () => {
  let INPUT: day.ParsedInput;
  beforeEach(() => {
    INPUT = day.parseInput();
  });

  it.each([1141])('part1 is %s', expected => {
    expect(day.part1(INPUT)).toEqual(expected);
  });

  it.each([6877])('part2 is less than %s', expected => {
    expect(day.part2(INPUT)).toBeLessThan(expected);
  });
});
