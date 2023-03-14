import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parse from './parsers.js';

const genDiff = (filepath1, filepath2) => {
  const extention1 = path.extname(filepath1);
  const extention2 = path.extname(filepath2);
  const data1 = fs.readFileSync(filepath1, 'utf-8');
  const data2 = fs.readFileSync(filepath2, 'utf-8');
  const obj1 = parse(data1, extention1);
  const obj2 = parse(data2, extention2);
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const uniqKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(uniqKeys);

  const result = sortedKeys.reduce((acc, key) => {
    if (!_.has(obj1, key)) {
      acc.push(`+ ${key}: ${obj2[key]}\n`);
    } else if (!_.has(obj2, key)) {
      acc.push(`- ${key}: ${obj1[key]}\n`);
    } else if (obj1[key] === obj2[key]) {
      acc.push(`  ${key}: ${obj1[key]}\n`);
    } else if (obj1[key] !== obj2[key]) {
      acc.push(`- ${key}: ${obj1[key]}\n`);
      acc.push(`+ ${key}: ${obj2[key]}\n`);
    }
    return acc;
  }, []);
  return `{\n${result.join('')}}`;
};

export default genDiff;
