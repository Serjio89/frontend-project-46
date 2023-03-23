import stylishFormat from './stylish.js';

const formatter = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(data);
    default:
      throw new Error(`Format ${formatName} is not supported!`);
  }
};

export default formatter;
