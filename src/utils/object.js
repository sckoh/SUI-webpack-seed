export const forOwn = (object, callback) => {
  const keys = Object.keys(object);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    callback(object[key], key);
  }
};

export const assign = (object, anotherObj) => {
  forOwn(anotherObj, (value, key) => {
    object[key] = value;
  });
  return object;
};
