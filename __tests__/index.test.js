import { readFileSync } from 'node:fs';
import formatter from '../src/formatters/index.js';
import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const stylish = readFileSync('__fixtures__/expected_file_stylish.txt', 'utf-8');
const plain = readFileSync('__fixtures__/expected_file_plain.txt', 'utf-8');
const json = readFileSync('__fixtures__/expected_file_json.txt', 'utf-8');

const formats = ['json', 'yaml', 'yml'];

test.each(formats)('stylish test - %s format', (format) => {
  expect(genDiff(`file1.${format}`, `file2.${format}`)).toBe(stylish);
});

test.each(formats)('plain test - %s format', (format) => {
  expect(genDiff(`file1.${format}`, `file2.${format}`, 'plain')).toBe(plain);
});

test.each(formats)('json test - %s format', (format) => {
  expect(genDiff(`file1.${format}`, `file2.${format}`, 'json')).toBe(json);
});
test('errors test', () => {
  expect(() => (parser('data', 'error'))).toThrow('not supported');
  expect(() => (formatter('data', 'error'))).toThrow('not supported');
});
