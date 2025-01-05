import {readFileSync} from 'fs';
import * as path from 'path';

export function readInput(override?: InputOverride): string {
  return (
    override?.raw ??
    readFileSync(path.join(__dirname, override?.path ?? '/input.txt'), {
      encoding: 'utf8',
    })
  );
}
