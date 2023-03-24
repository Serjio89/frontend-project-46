import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return String(value);
};

const plainFormatedTree = (tree, path = '') => {
  const filteredTree = tree.filter(({ type }) => type !== 'unchanged');
  const plainedTree = filteredTree.map((node) => {
    switch (node.type) {
      case 'added': {
        return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
      }
      case 'changed': {
        return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
      }
      case 'nested': {
        return plainFormatedTree(node.children, `${path}${node.key}.`);
      }
      default:
        return `Property '${path}${node.key}' was removed`;
    }
  });
  return plainedTree.join('\n');
};

const plainFormat = (tree) => plainFormatedTree(tree);

export default plainFormat;
