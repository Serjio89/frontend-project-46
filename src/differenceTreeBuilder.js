import _ from 'lodash';
import { stringify } from './utils.js';


const getAddedNode = (data2, key) => ({
  type: 'added',
  value: data2[key]
});

const getDeletedNode = (data1, key) => ({
  type: 'deleted',
  value: data1[key]
});

const getNestedNode = (data1, data2, key) => ({
  type: 'nested',
  children: getDifference(data1[key], data2[key])
});

const getChangedNode = (data1, data2, key) => ({
  type: 'changed',
  value1: data1[key],
  value2: data2[key]
});

const getUnchangedNode = (data2, key) => ({
  type: 'unchanged',
  value: data2[key]
});

const getNodeType = (data1, data2, key) => {
  let result;
  
  if (!_.has(data1, key)) {
    result = getAddedNode(data2, key);
  } else if (!_.has(data2, key)) {
    result = getDeletedNode(data1, key);
  } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
    result = getNestedNode(data1, data2, key);
  } else if (!_.isEqual(data1[key], data2[key])) {
    result = getChangedNode(data1, data2, key);
  } else {
    result = getUnchangedNode(data2, key);
  }
  
  return result;
};

const addNode = (key, value, depth) => ({
  key,
  type: 'added',
  value: stringify(value, depth),
});

const deleteNode = (key, value, depth) => ({
  key,
  type: 'deleted',
  value: stringify(value, depth),
});

const changeNode = (key, value1, value2, depth) => ({
  key,
  type: 'changed',
  value1: stringify(value1, depth),
  value2: stringify(value2, depth),
});

const formatNode = (key, value, depth, type, children) => {
  const nodeValue = children ? `{\n${children}\n${indent(depth)}}` : value;
  switch (type) {
    case 'added':
      return addNode(key, nodeValue, depth);
    case 'deleted':
      return deleteNode(key, nodeValue, depth);
    case 'changed':
      return changeNode(key, value.value1, value.value2, depth);
    case 'nested':
      return {
        key,
        type: 'nested',
        children,
      };
    default:
      return {
        key,
        type: 'unchanged',
        value: stringify(value, depth),
      };
  }
};

const getDifference = (data1, data2, depth = 1) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);
 
  return sortedKeys.map((key) => {
    const nodeType = getNodeType(data1, data2, key);
    const { type, value1, value2, children } = nodeType;
    const value = type !== 'changed' ? nodeType.value : { value1, value2 };
    return formatNode(key, value, depth, type, children);
  });
};
 export default getDifference;