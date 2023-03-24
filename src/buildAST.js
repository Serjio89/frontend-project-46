import _ from 'lodash';

const getValueForKey = (key, data) => (_.has(data, key) ? data[key] : undefined);

const getDifference = (data1, data2) => {
  const keys1 = _.keysIn(data1);
  const keys2 = _.keysIn(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  return sortedKeys.reduce((acc, key) => {
    const value1 = getValueForKey(key, data1);
    const value2 = getValueForKey(key, data2);

    if (_.isUndefined(value1)) {
      acc.push({ key, type: 'added', value: value2 });
      return acc;
    }

    if (_.isUndefined(value2)) {
      acc.push({ key, type: 'deleted', value: value1 });
      return acc;
    }

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      acc.push({ key, type: 'nested', children: getDifference(value1, value2) });
      return acc;
    }

    if (!_.isEqual(value1, value2)) {
      acc.push({
        key, type: 'changed', value1, value2,
      });
      return acc;
    }

    acc.push({ key, type: 'unchanged', value: value2 });
    return acc;
  }, []);
};

export default getDifference;
