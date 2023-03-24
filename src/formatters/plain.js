import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (_.isString(value)) return `'${value}'`;
  return String(value);
};

const formatTree = (tree, path = '') => tree
  .filter(({ type }) => type !== 'unchanged')
  .map((node) => {
    switch (node.type) {
      case 'added': {
        return `Property '${path}${node.key}' was added with value: ${stringify(node.value)}`;
      }
      case 'changed': {
        return `Property '${path}${node.key}' was updated. From ${stringify(node.value1)} to ${stringify(
          node.value2,
        )}`;
      }
      case 'nested': {
        return formatTree(node.children, `${path}${node.key}.`);
      }
      default:
        return `Property '${path}${node.key}' was removed`;
    }
  })
  .join('\n');

const plainFormat = (tree) => formatTree(tree);

export default plainFormat;
