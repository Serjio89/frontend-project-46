import path from 'path';
import { readFileSync } from 'node:fs';
import _ from 'lodash';

const absoluthPath = (fileName) => path.resolve(process.cwd(), fileName);

const data = (file) => readFileSync(absoluthPath(file), 'utf-8');

const newPath = (file) => path.extname(file).slice(1);

const stringify = (data, depth) => {
    if (!_.isObject(data))
     return String(data);
  
    const lines = Object
      .entries(data)
      .map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
    return `{\n${lines.join('\n')}\n${indent(depth)}}`;
  };

export { absoluthPath, data, newPath, stringify };