import {resolve} from 'path';

const solution = require(resolve(`./src/${process.argv[2]}/index.ts`));
console.log(solution.default());
