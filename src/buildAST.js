import _ from 'lodash';

const getValueForKey = (key, data) => (_.has(data, key) ? data[key] : undefined);

const getDifference = (data1, data2) => {
  const sortedKeys = _.sortBy(_.uniq([..._.keysIn(data1), ..._.keysIn(data2)]));

  const result = sortedKeys.map((key) => {
    const value1 = getValueForKey(key, data1);
    const value2 = getValueForKey(key, data2);

    switch (true) {
      case value1 === undefined:
        return { key, type: 'added', value: value2 };
      case value2 === undefined:
        return { key, type: 'deleted', value: value1 };
      case _.isPlainObject(value1) && _.isPlainObject(value2):
        return { key, type: 'nested', children: getDifference(value1, value2) };
      case !_.isEqual(value1, value2):
        return {
          key, type: 'changed', value1, value2,
        };
      default:
        return { key, type: 'unchanged', value: value2 };
    }
  });

  return result;
};

export default getDifference;
