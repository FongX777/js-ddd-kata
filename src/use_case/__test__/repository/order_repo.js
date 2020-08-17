/** @typedef {import('../../../domain/model/order').Order} Order */
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

  /**
   * @returns {Order}
   */
  getFirstOne() {
    return Object.values(this.db)[0];
  }
}

module.exports = {
  InMemOrderRepository,
};
