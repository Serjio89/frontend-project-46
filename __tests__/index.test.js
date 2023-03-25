import { readFileSync } from 'node:fs';
import formatter from '../src/formatters/index.js';

import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const stylish = readFileSync('__fixtures__/expected_file_stylish.txt', 'utf-8');
const plain = readFileSync('__fixtures__/expected_file_plain.txt', 'utf-8');
const json = readFileSync('__fixtures__/expected_file_json.txt', 'utf-8');

test('stylish test', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(stylish);
  expect(genDiff('file1.yaml', 'file2.yaml')).toBe(stylish);
  expect(genDiff('file1.yml', 'file2.yml')).toBe(stylish);
});
test('plain test', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toBe(plain);
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toBe(plain);
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toBe(plain);
});
test('json test', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toBe(json);
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toBe(json);
  expect(genDiff('file1.yml', 'file2.yml', 'json')).toBe(json);
});

test('errors test', () => {
  expect(() => (parser('data', 'error'))).toThrow('not supported');
  expect(() => (formatter('data', 'error'))).toThrow('not supported');
});
