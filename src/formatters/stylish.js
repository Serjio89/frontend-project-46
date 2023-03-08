import _ from 'lodash';
import chalk from 'chalk';
import { stringify } from '../utils.js';


const replacer = ' ';
const signSpace = 2;
const spacesCount = 4;

const indent = (depth, isFull = true) => {
  const size = depth * spacesCount;
  return isFull ? replacer.repeat(size) : replacer.repeat(size - signSpace);
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