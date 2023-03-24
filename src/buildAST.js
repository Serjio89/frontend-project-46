import _ from 'lodash';

const getValueForKey = (key, data) => (_.has(data, key) ? data[key] : undefined);

const getDifference = (data1, data2) => {
  const sortedKeys = _.sortBy(_.uniq([..._.keysIn(data1), ..._.keysIn(data2)]));

  const result = sortedKeys.reduce((acc, key) => {
    const value1 = getValueForKey(key, data1);
    const value2 = getValueForKey(key, data2);

    if (value1 === undefined) {
      acc.push({ key, type: 'added', value: value2 });
    } else if (value2 === undefined) {
      acc.push({ key, type: 'deleted', value: value1 });
    } else if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      acc.push({ key, type: 'nested', children: getDifference(value1, value2) });
    } else if (!_.isEqual(value1, value2)) {
      acc.push({
        key, type: 'changed', value1, value2,
      });
    } else {
      acc.push({ key, type: 'unchanged', value: value2 });
    }

    return acc;
  }, []);

  return result;
};

export default getDifference;
