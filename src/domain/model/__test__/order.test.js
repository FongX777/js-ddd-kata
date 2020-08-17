const test = require('ava').default;
const { Order } = require('../order');
const { Money } = require('../money');
const { v4: uuidv4 } = require('uuid');

const getSampleRecipientParam = () => ({
  name: 'Bella Recipient',
  email: 'bella@meepshop.com',
  phoneNumber: '0987121212',
  shippingAddress: 'Taipei District Xinyi Renai Road No 188',
});
const getSampleItemParam = () => ({
  name: 'line item',
  unitPrice: 10,
  quantity: 4,
  productId: uuidv4(),
});

test('create Order with default status PROCESSING', (t) => {
  const [err, order] = Order.createDefault({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: getSampleRecipientParam(),
    items: [getSampleItemParam()],
    currency: Money.AllowCurrencies.TWD,
  });
  t.is(err, undefined);
  t.is(order.status, Order.Statuses.PROCESSING);
});

test('Min 1 item', (t) => {
  const [err, order] = Order.createDefault({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: getSampleRecipientParam(),
    items: [],
    currency: Money.AllowCurrencies.TWD,
  });
  t.is(err, 'Min 1 item');
  t.is(order, undefined);
});

test('Max 8 items', (t) => {
  const [err, order] = Order.createDefault({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: getSampleRecipientParam(),
    items: [
      getSampleItemParam(), // 1
      getSampleItemParam(),
      getSampleItemParam(),
      getSampleItemParam(),
      getSampleItemParam(),
      getSampleItemParam(),
      getSampleItemParam(),
      getSampleItemParam(), // 8
      getSampleItemParam(), // 9
    ],
    currency: Money.AllowCurrencies.TWD,
  });
  t.is(err, 'Max 8 items');
  t.is(order, undefined);
});

test('Each item can only has at max 5 pieces', (t) => {
  const itemParam = getSampleItemParam();
  itemParam.quantity = 20;
  const [err, order] = Order.createDefault({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: getSampleRecipientParam(),
    items: [itemParam],
    currency: Money.AllowCurrencies.TWD,
  });
  t.is(err, "Item 'line item' has invalid quantity '20'");
  t.is(order, undefined);
});

test('Max order amount should not exceed 10,0000', (t) => {
  const itemParam = getSampleItemParam();
  itemParam.unitPrice = 2000000;
  const [err, order] = Order.createDefault({
    id: 'fc776159-5404-4b4c-aca2-9ffabe1ede5e',
    recipient: getSampleRecipientParam(),
    items: [itemParam],
    currency: Money.AllowCurrencies.TWD,
  });
  t.is(err, 'Order amount should not surpass 10,0000');
  t.is(order, undefined);
});
