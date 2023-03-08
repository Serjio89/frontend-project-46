import path from 'path';
import { readFileSync } from 'node:fs';

const absoluthPath = (fileName) => path.resolve(process.cwd(), fileName);

const data = (file) => readFileSync(absoluthPath(file), 'utf-8');

const newPath = (file) => path.extname(file).slice(1);

export { absoluthPath, data, newPath };