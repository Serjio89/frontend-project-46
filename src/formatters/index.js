import stylishFormat from './stylish.js';
import plainFormat from './plain.js';
import jsonFormat from './json.js';

const formatter = (data, formatName) => {
  switch (formatName) {
    case 'stylish':
      return stylishFormat(data);
    case 'plain':
      return plainFormat(data);
    case 'json':
      return jsonFormat(data);
    default:
      throw new Error(`Format ${formatName} is not supported!`);
  }
};

export default formatter;
