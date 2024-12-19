import * as m from '.';

it('exists', () => {
  expect(m.default).toBeDefined();
});

describe('checkReportPart2', () => {
  const cases: [number[], boolean][] = [
    // AOC example
    [[7, 6, 4, 2, 1], true],
    [[1, 2, 7, 8, 9], false],
    [[9, 7, 6, 2, 1], false],
    [[1, 3, 2, 4, 5], true],
    [[8, 6, 4, 4, 1], true],
    [[1, 3, 6, 7, 9], true],

    // :) cases
    [[1, 2, 3, 4, 5], true],
    [[10, 9, 7, 4, 1], true],
    [[1, 2, 1, 3, 4], true],
    [[1, 5, 6, 7, 8], true],
    [[5, 6, 3, 2, 1], true],

    // :( cases
    [[10, 20, 30, 40, 50], false],
    [[50, 40, 30, 20, 10], false],
  ];

  it.each(cases)('handles example case %s: %s', (report, expected) => {
    const isSafe = m.checkReportPart2(report);

    expect(isSafe).toBe(expected);
  });
});
