import { readFileSync } from 'node:fs';
import formatter from '../src/formatters/index.js';

import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const stylishResult = readFileSync('__fixtures__/expected_file_stylish.txt', 'utf-8');
const plainResult = readFileSync('__fixtures__/expected_file_plain.txt', 'utf-8');

test('stylish test', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(stylishResult);
  expect(genDiff('file1.yaml', 'file2.yaml')).toBe(stylishResult);
  expect(genDiff('file1.yml', 'file2.yml')).toBe(stylishResult);
});
test('plain test', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toBe(plainResult);
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toBe(plainResult);
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toBe(plainResult);
});

test('errors test', () => {
  expect(() => (parser('data', 'error'))).toThrow('not supported');
  expect(() => (formatter('data', 'error'))).toThrow('not supported');
});
