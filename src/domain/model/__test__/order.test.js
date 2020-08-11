const test = require('ava').default;
const { Order } = require('../order');

test('create Order', (t) => {
  const [err, order] = Order.create({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: {},
    items: [],
  });
  t.is(err, undefined);
  t.is(order.status, Order.Statuses.PROCESSING);
});

test('Max 8 items', (t) => {
  const [err, order] = Order.create({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: {},
    items: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  });
  t.is(err, 'Max 8 items');
});
