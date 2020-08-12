const { IOrderRepository } = require('../../../domain/model/order');

class InMemOrderRepository extends IOrderRepository {
  constructor() {
    super();
    this.db = {};
  }

  async get(id) {
    return this.db[id];
  }

  async save(data) {
    this.db[data.id] = data;
  }

  getFirstOne() {
    return Object.values(this.db).length;
  }
}

module.exports = {
  InMemOrderRepository,
};
