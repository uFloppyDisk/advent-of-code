/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import ts from "typescript";
import { pathsToModuleNameMapper, JestConfigWithTsJest } from 'ts-jest';
const { config: { compilerOptions } } = ts.readConfigFile("./tsconfig.json", ts.sys.readFile);

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>" }),
  modulePaths: ['<rootDir>'],

  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest", {}],
  },
};

export default config;
