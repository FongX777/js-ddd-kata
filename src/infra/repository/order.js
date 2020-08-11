const { IOrderRepository, Order } = require('../../domain/model/order');

class PGOrderRepository extends IOrderRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  async get(id) {
    const dbData = this.db.query('SELECT * FROM orders where id = $1', [id]);
    return toAggregate(dbData);
  }

  async save(data) {
    this.db.query('INSERT ....');
  }
}

function toAggregate(dbData) {
  const [err, order] = Order.build(dbData);
  if (err) {
    throw new Error(err);
  }
  return order;
}
