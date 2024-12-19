const fs = require('fs');
const path = require('path');

const PATH_TO_SRC = path.join(__dirname, '..', 'src');

function createOrProceedDir(cwd, name) {
  if (Array.isArray(name)) name = name.join('/');

  try {
    const dir = fs.readdirSync(cwd);

    if (!dir.some(v => v === name)) {
      fs.mkdirSync(path.join(cwd, name));
    }
  } catch (e) {
    throw new Error(`idk little bro: ${e}`);
  }

  return path.join(cwd, name);
}

try {
  const rawArg = process.argv[2];
  if (!rawArg) throw new SyntaxError('Did not pass required YYYY/DD argument');

  const args = rawArg.split('/');
  if (args.length !== 2)
    throw new RangeError(`Arg must have shape YYYY/DD, received ${rawArg}`);

  if (args.map(v => parseInt(v)).some(v => isNaN(v)))
    throw new TypeError(`One or both args are NaN: ${args}`);

  args[1] = args[1].toString().padStart(2, '0');

  const yearDir = createOrProceedDir(PATH_TO_SRC, args[0]);
  const dayDir = createOrProceedDir(yearDir, args[1]);
  const dir = fs.readdirSync(dayDir);

  if (dir.length > 0)
    throw new Error(`Target day directory is not empty: ${dayDir}`);

  fs.cpSync(path.join(__dirname, 'templates', 'day/'), dayDir, {
    recursive: true,
  });
} catch (e) {
  console.error(e);
}
