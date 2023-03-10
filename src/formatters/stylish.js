import _ from 'lodash';
import chalk from 'chalk';

const indent = ' ';
const indentSize = 4;
const currentIndent = (depth) => indent.repeat(indentSize * depth - 2);
const braceIndent = (depth) => indent.repeat(indentSize * depth - indentSize);

const buildStylishTree = (lines, depth) => [
  '{',
  ...lines,
  `${braceIndent(depth)}}`,
].join('\n');

const stringify = (data, depth) => {
  if ((!_.isObject(data)) || (data === null)) {
    return String(data);
  }
  const keys = _.keys(data);
  const lines = keys.map((key) => `${currentIndent(depth)}  ${key}: ${stringify(data[key], depth + 1)}`);
  return buildStylishTree(lines, depth);
};

const diffStylish = (data) => {
  const iter = (currentValue, depth) => {
    const { type } = currentValue;
    switch (type) {
      case 'default': {
        const result = currentValue.children.flatMap((child) => iter(child, depth));
        return buildStylishTree(result, depth);
      }
      case 'nested': {
        const childrenToString = currentValue.children.flatMap((child) => iter(child, depth + 1));
        return `${currentIndent(depth)}${chalk.gray(currentValue.name)}: ${buildStylishTree(childrenToString, depth + 1)}`;
      }
      case 'added': {
        return `${currentIndent(depth)}${chalk.green(`+ ${currentValue.name}: ${stringify(currentValue.value, depth + 1)}`)}`;
      }
      case 'removed': {
        return `${currentIndent(depth)}${chalk.red(`- ${currentValue.name}: ${stringify(currentValue.value, depth + 1)}`)}`;
      }
      case 'changed': {
        return [
          `${currentIndent(depth)}${chalk.red(`- ${currentValue.name}: ${stringify(currentValue.value, depth + 1)}`)}`,
          `${currentIndent(depth)}${chalk.green(`+ ${currentValue.name}: ${stringify(currentValue.value2, depth + 1)}`)}`,
        ];
      }
      case 'unchanged': {
        return [
          `${currentIndent(depth)}  ${chalk.gray(currentValue.name)}: ${chalk.yellow(stringify(currentValue.value, depth + 2))}`,
        ];
      }
      default: {
        throw Error('Uncorrect data');
      }
    }
  };
  return iter(data, 1);
};

export default diffStylish;
