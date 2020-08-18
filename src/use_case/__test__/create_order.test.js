const { Order } = require('../../domain/model/order');
const { CreateOrderUseCase } = require('../order/create_order');
const { InMemOrderRepository } = require('./repository/order_repo');
const test = require('ava').default;

const getSampleRecipientParam = () =>
  CreateOrderUseCase.toRecipient({
    name: 'Bella Recipient',
    email: 'bella@meepshop.com',
    phoneNumber: '0987121212',
    shippingAddress: 'Taipei District Xinyi Renai Road No 188',
  });
const getSampleItemParam = () =>
  CreateOrderUseCase.toItem({
    productId: '32e5d058-398d-483f-a7d1-92e5af4e81db',
    name: 'Test Product Name',
    quantity: 3,
    unitPrice: 10,
  });

test('Creation test - with init status processing', async (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const items = [getSampleItemParam()];

  const recipient = getSampleRecipientParam();

  const result = await usecase.execute({
    items,
    recipient,
  });

  t.is(result.error, undefined);
  const order = orderRepo.getFirstOne();
  t.is(order.status, Order.Statuses.PROCESSING);
  t.is(result.order.status, Order.Statuses.PROCESSING);
});

test.skip('Min 1 item', async (t) => {
  // TODO: fix it
});

test.skip('Min 8 items', async (t) => {
  // TODO: fix it
});

test.skip('Each item can only has at max 5 pieces', async (t) => {
  // TODO: fix it
});

test.skip('Max order amount should not exceed 10,0000', async (t) => {
  // TODO: fix it
});
