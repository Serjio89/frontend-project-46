import { readFileSync } from 'node:fs';
import formatter from '../src/formatters/index.js';

import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const stylishResult = readFileSync('__fixtures__/expected_file.txt', 'utf-8');

test('testing stylish nested', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(stylishResult);
  expect(genDiff('file1.yaml', 'file2.yaml')).toBe(stylishResult);
  expect(genDiff('file1.yml', 'file2.yml')).toBe(stylishResult);
});

test('should be errors', () => {
  expect(() => (parser('randomdata', 'whoops'))).toThrow('not supported!');
  expect(() => (formatter('randomdata', 'whoops'))).toThrow('not supported!');
});
