import _ from 'lodash';

const buildDifference = (data1, data2) => {
  const data1Keys = _.keys(data1);
  const data2Keys = _.keys(data2);
  const unitedKeys = _.union(data1Keys, data2Keys);
  const sortedKeys = _.sortBy(unitedKeys);

  const children = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return {
        type: 'added',
        name: key,
        value: data2[key],
      };
    }
    if (!_.has(data2, key)) {
      return {
        type: 'removed',
        name: key,
        value: data1[key],
      };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        type: 'nested',
        name: key,
        children: buildDifference(data1[key], data2[key]),
      };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return {
        type: 'unchanged',
        name: key,
        value: data1[key],
      };
    }
    return {
      type: 'changed',
      name: key,
      value: data1[key],
      value2: data2[key],
    };
  });
  return children;
};

const getDifferenceTree = (data1, data2) => ({
  type: 'default',
  children: buildDifference(data1, data2),
});

export default getDifferenceTree;
