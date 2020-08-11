const { IOrderRepository, Order } = require('../../domain/model/order');

class InMemOrderRepository extends IOrderRepository {
  constructor() {
    super();
    this.db = {};
  }

  async get(id) {
    return this.db.find(db.id === id);
  }

  async save(data) {
    this.db.push(data);
  }
}

module.exports = {
  InMemOrderRepository,
};
