const test = require('ava').default;
const { Money } = require('../money');

// Money should have 2 values: amount & currency
// Money only accept 'TWD', 'USD', 'JPY'
// Money.add

// test 1: creation test
test('Create a money', (t) => {
  const money = new Money({
    amount: 1000,
    currency: 'TWD',
  });
  t.is(money.amount, 1000);
  t.is(money.currency, 'TWD');
});

test('Money value should > 0', (t) => {
  const result = t.throws(
    () =>
      new Money({
        amount: -1,
        currency: 'TWD',
      })
  );
  t.is(result.message, 'Money amount should not be negative');
});

// TO FIX
test('Invalid Money Currency', (t) => {
  const result = t.throws(
    () =>
      new Money({
        amount: 1000,
        currency: 'OBVIOUS_INCORRECT',
      })
  );
  t.is(result.message, 'Money currency is not allowed');
});

test('Money Add', (t) => {
  const money = new Money({
    amount: 1000,
    currency: 'TWD',
  });
  const moneyToAdd = new Money({
    amount: 500,
    currency: 'TWD',
  });
  const newMoney = money.add(moneyToAdd);
  t.is(newMoney.amount, 1500);
  t.is(newMoney.currency, 'TWD');
});

test('Money Add should have the same currency', (t) => {
  const money = new Money({
    amount: 1000,
    currency: 'TWD',
  });
  const moneyToAdd = new Money({
    amount: 500,
    currency: 'USD',
  });
  const result = t.throws(() => {
    money.add(moneyToAdd);
  });
  t.is(result.message, 'Currency should be the same');
});
