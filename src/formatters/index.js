import diffStylish from './stylish.js';
import diffPlain from './plain.js';

const makeDiff = (data, format) => {
  switch (format) {
    case 'stylish': {
      return diffStylish(data);
    }
    case 'plain': {
      return diffPlain(data);
    }
    case 'json': {
      return JSON.stringify(data);
    }
    default: {
      throw Error(`Incorrect format: ${format}`);
    }
  }
};

export default makeDiff;
