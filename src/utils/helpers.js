const groupByFn = (array, keyTransformFn) => {
  return [...new Map(array.map((a) => [keyTransformFn(a), a])).values()];
};

const groupByKey = (array, key, valTransformFn) => {
  return array.reduce((obj, a) => {
    (obj[a[key]] = obj[a[key]] || []).push(valTransformFn ? valTransformFn(a) : a);
    return obj;
  }, {});
};

const roundNumber = (number, decimals) => {
  return Number(Math.round(Number(`${number}e${decimals}`)) + "e-" + decimals);
};

export { groupByFn, groupByKey, roundNumber };
