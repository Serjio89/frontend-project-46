#!/usr/bin/env node
import { Command } from 'commander';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .name('gendiff')
  .version('10.0.0')
  .option('-f, --format <type>',  'output format')
  .helpOption('-h, --help', 'output usage information')
  .parse(process.argv);
