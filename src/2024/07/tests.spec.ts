import * as day from '.';

it('exists', () => {
  expect(day.default).toBeDefined();
});

describe('part1', () => {
  it('test case is 3749', () => {
    const INPUT = day.parseInput({path: '/example.txt'});
    expect(day.part1(INPUT)).toBe(3749);
  });

  it('problem case is correct', () => {
    const INPUT = day.parseInput();
    expect(day.part1(INPUT)).toEqual(2501605301465);
  });
});

describe('part2', () => {
  it('test case is 11387', () => {
    const INPUT = day.parseInput({path: '/example.txt'});
    expect(day.part2(INPUT)).toEqual(11387);
  });

  it('problem case is correct', () => {
    const INPUT = day.parseInput();
    expect(day.part2(INPUT)).toEqual(44841372855953);
  });
});
