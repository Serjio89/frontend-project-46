import { readFileSync } from 'node:fs';
import formatter from '../src/formatters/index.js';
import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const stylishResult = readFileSync('__fixtures__/expected_file_stylish.txt', 'utf-8');
const plainResult = readFileSync('__fixtures__/expected_file_plain.txt', 'utf-8');
const jsonResult = readFileSync('__fixtures__/expected_file_json.txt', 'utf-8');

test('testing stylish nested', () => {
  expect(genDiff('file1.json', 'file2.json')).toBe(stylishResult);
  expect(genDiff('file1.yaml', 'file2.yaml')).toBe(stylishResult);
  expect(genDiff('file1.yml', 'file2.yml')).toBe(stylishResult);
});

test('testing plain nested', () => {
  expect(genDiff('file1.json', 'file2.json', 'plain')).toBe(plainResult);
  expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toBe(plainResult);
  expect(genDiff('file1.yml', 'file2.yml', 'plain')).toBe(plainResult);
});

test('testing json nested', () => {
  expect(genDiff('file1.json', 'file2.json', 'json')).toBe(jsonResult);
  expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toBe(jsonResult);
  expect(genDiff('file1.yml', 'file2.yml', 'json')).toBe(jsonResult);
});

test('should be errors', () => {
  expect(() => (parser('randomdata', 'whoops'))).toThrow('not supported!');
  expect(() => (formatter('randomdata', 'whoops'))).toThrow('not supported!');
});
