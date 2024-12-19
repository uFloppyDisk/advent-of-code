import {readFileSync} from 'fs';

function readInput(): number[][] {
  const file = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
  });

  const reports = [];
  for (const line of file.split('\n')) {
    const nums = line.split(' ').map(v => parseInt(v));
    if (nums.some(v => isNaN(v) || typeof v === 'undefined')) continue;
    reports.push(nums);
  }

  return reports;
}

function checkReportPart1(report: number[]): boolean {
  let ascending = null;
  let last = null;
  for (const level of report) {
    if (!last) {
      last = level;
      continue;
    }

    const diff = level - last;
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) return false;
    if (ascending === null) {
      ascending = diff > 0;
    } else {
      if (ascending && diff < 0) return false;
      if (!ascending && diff > 0) return false;
    }

    last = level;
  }

  return true;
}

export function checkReportPart2(report: number[]): boolean {
  function checkIsUnsafe(diff: number, ascending: boolean | null): boolean {
    if (Math.abs(diff) > 3 || Math.abs(diff) < 1) return true;

    if (ascending === null) return false;
    return ascending !== diff > 0;
  }

  for (let exclude = 0; exclude < report.length; ++exclude) {
    let isSafe = true;

    let ascending = null;
    for (let index = 1; index < report.length; ++index) {
      if (exclude === 0 && index === 1) continue;
      if (index === exclude) continue;

      let lastIndex = index - 1;
      if (lastIndex === exclude) --lastIndex;

      const diff = report[index] - report[lastIndex];
      if (ascending === null && diff !== 0) ascending = diff > 0;

      checkIsUnsafe(diff, ascending) ? (isSafe = false) : null;
    }

    if (isSafe) return true;
  }

  return false;
}

function totalSafe(
  reports: number[][],
  checkFn: (report: number[]) => boolean,
) {
  let total = 0;
  for (const report of reports) {
    if (checkFn(report)) total += 1;
  }

  return total;
}

export default function (): unknown {
  const reports = readInput();

  return {
    part1: totalSafe(reports, checkReportPart1),
    part2: totalSafe(reports, checkReportPart2),
  };
}
