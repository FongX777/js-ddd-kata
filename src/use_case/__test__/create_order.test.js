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

test('Creation test', async (t) => {
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

test('Min 1 item', async (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const items = [];

  const recipient = getSampleRecipientParam();

  const result = await usecase.execute({
    items,
    recipient,
  });

  t.is(result.error.code, CreateOrderUseCase.ErrorCode.INCORRECT_PARMS);
  t.is(result.error.message, '[Create Order Error] Min 1 item');
});

test('Min 8 items', async (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const items = new Array(10).fill(getSampleItemParam);

  const recipient = getSampleRecipientParam();

  const result = await usecase.execute({
    items,
    recipient,
  });

  t.is(result.error.code, CreateOrderUseCase.ErrorCode.INCORRECT_PARMS);
  t.is(result.error.message, '[Create Order Error] Max 8 items');
});

test('Each item can only has at max 5 pieces', async (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const items = [getSampleItemParam()];
  items[0].quantity = 100;

  const recipient = getSampleRecipientParam();

  const result = await usecase.execute({ items, recipient });

  t.is(result.error.code, CreateOrderUseCase.ErrorCode.INCORRECT_PARMS);
  t.is(
    result.error.message,
    "[Create Order Error] Item 'Test Product Name' has invalid quantity '100'"
  );
});

test('Max order amount should not exceed 10,0000', async (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const items = [getSampleItemParam()];
  items[0].unitPrice = 10000000;

  const recipient = getSampleRecipientParam();

  const result = await usecase.execute({ items, recipient });

  t.is(result.error.code, CreateOrderUseCase.ErrorCode.INCORRECT_PARMS);
  t.is(
    result.error.message,
    '[Create Order Error] Order amount should not surpass 10,0000'
  );
});
