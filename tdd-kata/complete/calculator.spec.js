const test = require('ava').default;
const { add } = require('./calculator');

test('2 + 2 = 4', (t) => {
  const result = add(2, 2);
  t.is(result, 4);
});
test('2 + 3 = 5', (t) => {
  const result = add(2, 3);
  t.is(result, 5);
});
test('Only accept positive value', (t) => {
  const expectedError = t.throws(() => add(-2, 2));
  t.is(expectedError.message, 'Invalid Value Error');
});

test('Only accept positive value (contd.)', (t) => {
  const expectedError = t.throws(() => add(2, -2));
  t.is(expectedError.message, 'Invalid Value Error');
});

test('add values in the string', (t) => {
  const str = '1,2,3'; // expect 6
  const result = add(str);
  t.is(result, 6);
});
test('add values with negative value in the string', (t) => {
  const expectedError = t.throws(() => add('2,-2'));
  t.is(expectedError.message, 'Invalid Value Error');
});

test('Invalid Separator', (t) => {
  const expectedError = t.throws(() => add('2,a,-2'));
  t.is(expectedError.message, 'Invalid Separator Error');
});

test('Max 1000 values in the string', (t) => {
  const bigStr = new Array(1001).fill(1).join(',');
  const expectedError = t.throws(() => add(bigStr));
  t.is(expectedError.message, 'Max Value Count Excess Error');
});

test('break line is also a valid separator', (t) => {
  const str = '1,2\n3'; // expect 6
  const result = add(str);
  t.is(result, 6);
});
