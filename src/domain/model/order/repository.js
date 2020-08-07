/** @typedef {import('./order').Order} Order */

class IOrderRepository {
  /**
   * @param {string} id
   * @returns {Order}
   */
  get(id) {
    throw new Error('Not Implemented');
  }
  /**
   * @param {Order} order
   * @returns {void}
   */
  save(order) {
    throw new Error('Not Implemented');
  }
}

module.exports.IOrderRepository = IOrderRepository;
