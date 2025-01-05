import {readFileSync} from 'fs';
import * as path from 'path';
import {default as callsite} from 'callsite';

export function readInput(override?: InputOverride): string {
  const stack = callsite();
  const requestFile = stack[1].getFileName();

  return (
    override?.raw ??
    readFileSync(
      path.join(path.dirname(requestFile), override?.path ?? '/input.txt'),
      {
        encoding: 'utf8',
      },
    )
  );
}
