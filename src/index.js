import parser from './parsers.js';
import { absoluthPath } from './utils.js';
import getDifference from './differenceTreeBuilder.js';
import makeDiff from './formatters/index.js';

const genDiff = (file1Name, file2Name, formatName = 'stylish') => {
  const file1Data = absoluthPath(file1Name, 'utf-8');
  const parsedData1 = parser(file1Data);

  const file2Data = absoluthPath(file2Name, 'utf-8');
  const parsedData2 = parser(file2Data);

  const dtb = getDifference(parsedData1, parsedData2);
  return makeDiff(dtb, formatName);
};

export default genDiff;