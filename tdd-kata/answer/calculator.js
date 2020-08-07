const add = (a, b) => {
  if (typeof a === 'string') {
    const numStrsByComma = a.split(',');
    const nums = numStrsByComma.reduce((nums, numStr) => {
      return nums.concat(numStr.split('\n'));
    }, []);

    if (nums.length > 1000) {
      throw new Error('Max Value Count Excess Error');
    }
    return nums.reduce((acc, numStr) => {
      const num = Number(numStr);
      if (num < 0) {
        throw new Error('Invalid Value Error');
      }
      if (Number.isNaN(num)) {
        throw new Error('Invalid Separator Error');
      }
      return num + acc;
    }, 0);
  }

  if (a < 0 || b < 0) {
    throw new Error('Invalid Value Error');
  }
  return a + b;
};

module.exports = { add };
