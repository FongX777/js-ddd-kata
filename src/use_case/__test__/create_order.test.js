const { CreateOrderUseCase } = require('../order/create_order');
const { InMemOrderRepository } = require('./repository/order_repo');
const test = require('ava').default;

test('pass', (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const result = usecase.execute({});

  t.is(result.error, undefined);
  t.is(orderRepo.db.length, 1);
});
