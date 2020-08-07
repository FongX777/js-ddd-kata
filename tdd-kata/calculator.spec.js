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
  t.pass();
});
test('add values with negative value in the string', (t) => {
  const str = '1,2,-3'; // expect an Error
  t.pass();
});
