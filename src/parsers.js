import yml from 'js-yaml';
import { data, newPath } from './utils.js';

const parser = (file) => {
  const extension = newPath(file);
  if (extension === 'yaml' || extension === 'yml') {
    return yml(data(file));
  }

  return JSON.parse(data(file));
};

export default parser;