import yaml from 'js-yaml';

export default (data, extention) => {
  switch (extention) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    default:
      return extention;
  }
};
