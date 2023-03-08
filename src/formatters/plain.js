import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return String(value);
};

const formatTree = (tree, path = '') => {
  const filteredTree = tree.filter(({ type }) => type !== 'unchanged');
  const formattedNodes = filteredTree.map((node) => {
    switch (node.type) {
      case 'added':
        return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
      case 'changed':
        return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      case 'nested':
        return formatTree(node.children, `${path}${node.key}.`);
      case 'removed':
        return `Property '${path}${node.key}' was removed`;
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });
  return formattedNodes.join('\n');
};
const diffPlain = (tree) => formatTree(tree);
export default diffPlain;
