const { CreateOrderUseCase } = require('./create_order');
const {
  InMemOrderRepository,
} = require('../../infra/repository/in-memory-order');
const test = require('ava').default;

test('pass', (t) => {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);

  const result = usecase.execute({});

  t.is(result.error, undefined);
  t.is(orderRepo.db.length, 1);
});
