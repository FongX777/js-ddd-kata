/** @typedef {import('../../../domain/model/order').Order} Order */
const { IOrderRepository } = require('../../../domain/model/order');

class InMemOrderRepository extends IOrderRepository {
  constructor() {
    super();
    this.db = {};
  }

  async get(id) {
    // TODO: fix it
  }

  async save(data) {
    // TODO: fix it
  }

  /**
   * @returns {Order}
   */
  getFirstOne() {}
}

module.exports = {
  InMemOrderRepository,
};
