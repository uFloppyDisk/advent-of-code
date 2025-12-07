import * as day from '.';

describe('example case', () => {
  let INPUT: day.ParsedInput;
  beforeEach(() => {
    INPUT = day.parseInput({path: '/example.txt'});
  });

  it.each([357])('part1 is %s', expected => {
    expect(day.part1(INPUT)).toEqual(expected);
  });

  it.each([undefined])('part2 is %s', expected => {
    expect(day.part2(INPUT)).toEqual(expected);
  });
});

describe('problem case', () => {
  let INPUT: day.ParsedInput;
  beforeEach(() => {
    INPUT = day.parseInput();
  });

  it.each([17179])('part1 is %s', expected => {
    expect(day.part1(INPUT)).toEqual(expected);
  });

  it.each([undefined])('part2 is %s', expected => {
    expect(day.part2(INPUT)).toEqual(expected);
  });
});
