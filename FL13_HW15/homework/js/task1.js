function assign(target, ...source) {
  if (target === null || target === undefined) {
    throw new Error('Target cannot be null or undefined');
  }
  target = Object(target);
  source.forEach(object => {
    if (object) {
      Object.entries(object).forEach(([key, value]) => {
        target[key] = value;
      });
      Object.getOwnPropertySymbols(object).forEach(key => {
        target[key] = object[key]
      });
    }
  });
  return target;
}
