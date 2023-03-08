import yml from 'js-yaml';
import { fileData, newPath } from './utils.js';

const parser = (file) => {
  const extension = newPath(file);
  if (extension === 'yaml' || extension === 'yml') {
    return yml(fileData(file));
  }

  return JSON.parse(fileData(file));
};

export default parser;
