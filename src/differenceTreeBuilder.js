import _ from 'lodash';

const buildDifference = (data1, data2) => {
  const allKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(allKeys);

  const getPropertyDifference = (key) => {
    if (!_.has(data1, key)) {
      return { type: 'added', name: key, value: data2[key] };
    }
    if (!_.has(data2, key)) {
      return { type: 'removed', name: key, value: data1[key] };
    }
    const value1 = data1[key];
    const value2 = data2[key];
    if (_.isEqual(value1, value2)) {
      return { type: 'unchanged', name: key, value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'nested', name: key, children: buildDifference(value1, value2) };
    }
    return {
      type: 'changed', name: key, value: value1, value2,
    };
  };

  return sortedKeys.map(getPropertyDifference);
};

const getDifferenceTree = (data1, data2) => ({
  type: 'default',
  children: buildDifference(data1, data2),
});

export default getDifferenceTree;
