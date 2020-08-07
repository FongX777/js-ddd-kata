const add = (a, b) => {
  if (typeof a === 'string') {
    return;
  }

  if (a < 0 || b < 0) {
    throw new Error('Invalid Value Error');
  }
  return a + b;
};

module.exports = { add };
