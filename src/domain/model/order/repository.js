/** @typedef {import('./order').Order} Order */

class IOrderRepository {
  /**
   * @param {string} id
   * @returns {Promise.<Order>}
   */
  async get(id) {
    throw new Error('Not Implemented');
  }

  /**
   * @param {Order} order
   * @returns {Promise.<void>}
   */
  async save(order) {
    throw new Error('Not Implemented');
  }
}

module.exports.IOrderRepository = IOrderRepository;
