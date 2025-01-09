import * as day from '.';

describe('example case', () => {
  let INPUT: day.ParsedInput;
  beforeEach(() => {
    INPUT = day.parseInput({path: '/example.txt'});
    expect(INPUT).toBeDefined();
  });

  it.each([undefined])('part1 is %s', expected => {
    expect(day.part1(INPUT)).toEqual(expected);
  });

  it.each([undefined])('part2 is %s', expected => {
    expect(day.part2(INPUT)).toEqual(expected);
  });
});

describe.skip('problem case', () => {
  let INPUT: day.ParsedInput;
  beforeEach(() => {
    INPUT = day.parseInput();
    expect(INPUT).toBeDefined();
  });

  it.each([undefined])('part1 is %s', expected => {
    expect(day.part1(INPUT)).toEqual(expected);
  });

  it.each([undefined])('part2 is %s', expected => {
    expect(day.part2(INPUT)).toEqual(expected);
  });
});
