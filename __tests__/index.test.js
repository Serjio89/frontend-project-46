import { readFileSync } from 'node:fs';
import formatter from '../src/formatters/index.js';
import genDiff from '../src/index.js';
import parser from '../src/parsers.js';

const expectedStylish = readFileSync('__fixtures__/expected_file_stylish.txt', 'utf-8');
const expectedPlain = readFileSync('__fixtures__/expected_file_plain.txt', 'utf-8');
const expectedJson = readFileSync('__fixtures__/expected_file_json.txt', 'utf-8');

describe('genDiff', () => {
  test('stylish format', () => {
    expect(genDiff('file1.json', 'file2.json')).toEqual(expectedStylish);
    expect(genDiff('file1.yaml', 'file2.yaml')).toEqual(expectedStylish);
    expect(genDiff('file1.yml', 'file2.yml')).toEqual(expectedStylish);
  });

  test('plain format', () => {
    expect(genDiff('file1.json', 'file2.json', 'plain')).toEqual(expectedPlain);
    expect(genDiff('file1.yaml', 'file2.yaml', 'plain')).toEqual(expectedPlain);
    expect(genDiff('file1.yml', 'file2.yml', 'plain')).toEqual(expectedPlain);
  });

  test('json format', () => {
    expect(genDiff('file1.json', 'file2.json', 'json')).toEqual(expectedJson);
    expect(genDiff('file1.yaml', 'file2.yaml', 'json')).toEqual(expectedJson);
    expect(genDiff('file1.yml', 'file2.yml', 'json')).toEqual(expectedJson);
  });
});

describe('parser', () => {
  test('not supported format', () => {
    expect(() => parser('data', 'error')).toThrow('not supported');
  });
});

describe('formatter', () => {
  test('not supported format', () => {
    expect(() => formatter('data', 'error')).toThrow('not supported');
  });
});
