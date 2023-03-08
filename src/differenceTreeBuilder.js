const compareObjects = (obj1, obj2) => {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    throw new Error('Input must be objects');
  }
  
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const unionKeys = [...new Set([...keys1, ...keys2])].sort();

  const result = unionKeys.map((key) => {
    if (!obj1.hasOwnProperty(key)) {
      return { key, type: 'added', value: obj2[key] };
    }
    if (!obj2.hasOwnProperty(key)) {
      return { key, type: 'deleted', value: obj1[key] };
    }
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (obj1[key] === null || obj2[key] === null) {
        return { key, type: 'changed', value1: obj1[key], value2: obj2[key] };
      }
      try {
        JSON.stringify(obj1[key]);
        JSON.stringify(obj2[key]);
      } catch (error) {
        return { key, type: 'changed', value1: obj1[key], value2: obj2[key] };
      }
      return { key, type: 'nested', children: compareObjects(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return { key, type: 'changed', value1: obj1[key], value2: obj2[key] };
    }
    return { key, type: 'unchanged', value: obj1[key] };
  });

  return result;
};

export default compareObjects;
