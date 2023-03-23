import _ from 'lodash';

const getDifference = (data1, data2) => {
  const keys1 = _.keys(data1);
  const keys2 = _.keys(data2);
  const unionKeys = _.union(keys1, keys2);
  const sortedKeys = _.sortBy(unionKeys);

  const result = sortedKeys.map((key) => {
    let difference;

    if (!_.has(data1, key)) {
      difference = { key, type: 'added', value: data2[key] };
    } else if (!_.has(data2, key)) {
      difference = { key, type: 'deleted', value: data1[key] };
    } else if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      difference = { key, type: 'nested', children: getDifference(data1[key], data2[key]) };
    } else if (_.isEqual(data1[key], data2[key])) {
      difference = { key, type: 'unchanged', value: data1[key] };
    } else {
      difference = {
        key, type: 'changed', value1: data1[key], value2: data2[key],
      };
    }

    return difference;
  });

  return result;
};

export default getDifference;
