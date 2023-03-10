import path from 'path';
import { readFileSync } from 'fs';

const absoluthPath = (fileName) => path.resolve(process.cwd(), fileName);

const fileData = (file) => readFileSync(absoluthPath(file), 'utf-8');

const newPath = (file) => path.extname(file).slice(1);

export {
  absoluthPath, fileData, newPath,
};
