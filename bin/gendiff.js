#!/usr/bin/env node
import { Command } from 'commander';
import { genDiff } from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2);
    console.log(result);
  });

program.parse();
