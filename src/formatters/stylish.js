import _ from 'lodash';
import chalk from 'chalk';

const replacer = ' ';
const signSpace = 2;
const spacesCount = 4;

const indent = (depth, isFull = true) => {
  const size = depth * spacesCount;
  return isFull ? replacer.repeat(size) : replacer.repeat(size - signSpace);
};

const stringify = (data, depth) => {
  if (!_.isObject(data)) return String(data);

  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(depth + 1)}${key}: ${stringify(value, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${indent(depth)}}`;
};
const formatNode = (prefix, color, node, depth) => {
  const line = `${indent(depth, false)}${prefix} ${node.key}: ${stringify(node.value, depth)}`;
  return color ? chalk[color](line) : line;
};

const formatTree = (tree, depth = 1) => tree
  .map((node) => {
    switch (node.type) {
      case 'added': {
        return formatNode('+', 'green', node, depth);
      }
      case 'deleted': {
        return formatNode('-', 'red', node, depth);
      }
      case 'changed': {
      }
      case 'nested': {
      }
      default:
        return formatNode(' ', null, node, depth);
    }
  });

const diffStylish = (tree) => `{\n${formatTree(tree).join('\n')}\n}`;

export default diffStylish;