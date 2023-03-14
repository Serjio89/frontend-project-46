import * as fs from 'node:fs';
import path from 'node:path';
import genDiff from '../src/index.js';

const getFixturePath = (filename) => path.resolve(`__fixtures__/${filename}`);

const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

test.each([
  ['json'],
  ['yml'],
  // ['json', 'stylish'],
  // ['json', 'plain'],
  // ['json', 'json'],
  // ['yml', 'stylish'],
  // ['yml', 'plain'],
  // ['yml', 'json'],
])('%s files in %s format', (fileExtension, format = 'expected_file') => {
  const filePath1 = getFixturePath(`file1.${fileExtension}`);
  const filePath2 = getFixturePath(`file2.${fileExtension}`);
  const expected = readFile(`${format}.txt`);
  const result = genDiff(filePath1, filePath2, format);
  expect(result).toEqual(expected.trim());
});
