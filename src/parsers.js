import yaml from 'js-yaml';

const parse = (data, extension) => {
  switch (extension) {
    case '.yml':
      return yaml.load(data, 'utf8');
    default:
      return JSON.parse(data);
  }
};

export default parse;
