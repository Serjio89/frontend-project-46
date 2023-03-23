import _ from 'lodash';

const getValueForKey = (key, data) => (_.has(data, key) ? data[key] : undefined);

const getDifference = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);

  const result = sortedKeys.map((key) => {
    const value1 = getValueForKey(key, data1);
    const value2 = getValueForKey(key, data2);

    if (value1 === undefined) {
      return { key, type: 'added', value: value2 };
    }
    if (value2 === undefined) {
      return { key, type: 'deleted', value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { key, type: 'nested', children: getDifference(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        key, type: 'changed', value1, value2,
      };
    }
    return { key, type: 'unchanged', value: value2 };
  });

  return result;
};

export default getDifference;
