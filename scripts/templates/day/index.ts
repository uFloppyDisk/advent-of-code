import {readFileSync} from 'fs';

function readInput(): unknown {
  const file = readFileSync(`${__dirname}/input.txt`, {
    encoding: 'utf8',
  });

  return file;
}

export default function (): unknown {
  const INPUT = readInput();

  return { };
}
