import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parser from '../src/parsers.js';
import formatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const testCases = [
  {
    format: undefined,
    expectedFile: 'expected_file_stylish.txt',
  },
  {
    format: 'stylish',
    expectedFile: 'expected_file_stylish.txt',
  },
  {
    format: 'plain',
    expectedFile: 'expected_file_plain.txt',
  },
  {
    format: 'json',
    expectedFile: 'expected_file_json.txt',
  },
];

describe.each(testCases)('testing function genDiff $format formatter', ({ format, expectedFile }) => {
  const expected = readFile(expectedFile);

  test('json files compare', () => {
    const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), format);
    expect(actual).toBe(expected);
  });

  test('yaml files compare', () => {
    const actual = genDiff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), format);
    expect(actual).toBe(expected);
  });

  test('yml files compare', () => {
    const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), format);
    expect(actual).toBe(expected);
  });

  test('errors test', () => {
    expect(() => (parser('data', 'error'))).toThrow('not supported!');
    expect(() => (formatter('data', 'error'))).toThrow('not supported!');
  });
});
