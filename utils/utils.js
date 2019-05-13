const changeTimestamp = arr => {
  if (arr.length === 0) return [];
  const changedTimes = arr.map(item => {
    const changedObj = item;
    const timestamp = item.created_at;
    changedObj.created_at = new Date(timestamp);
    return changedObj;
  });
  return changedTimes;
};

const createRef = (data, key, id) => {
  const lookUpRef = {};
  data.map(item => {
    lookUpRef[item[key]] = item[id];
  });
  return lookUpRef;
};

const renameKey = (data, keyToChange, newKey) => {
  const reformatedData = data.map(item => {
    const changedObj = {};
    Object.keys(item).forEach(key => {
      return key === keyToChange
        ? (changedObj[newKey] = item[key])
        : (changedObj[key] = item[key]);
    });
    return changedObj;
  });
  return reformatedData;
};

const changeValues = (data, refObj, valueToChange) => {
  const finalData = data.map(obj => {
    obj[valueToChange] = refObj[obj[valueToChange]];
    return obj;
  });
  return finalData;
};

module.exports = { createRef, changeTimestamp, renameKey, changeValues };
