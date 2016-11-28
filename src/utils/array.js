export const map = (array, callback) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    newArray.push(callback(value, i));
  }
  return newArray;
};

export const filter = (array, filterFunc) => {
  const newArray = [];
  for (let i = 0; i < array.length; i++) {
    const value = array[i];
    if (filterFunc(value, i)) {
      newArray.push(value);
    }
  }
  return newArray;
};

export const reduce = (collection, reduceFunc, initialVal) => {
  let finalValue = initialVal;
  for (let i = 0; i < collection.length; i++) {
    const value = collection[i];
    finalValue = reduceFunc(finalValue, value, i);
  }
  return finalValue;
};
