/** @typedef {import('./order').Order} Order */

class OrderRepository {
  /**
   * @param {string} id
   * @returns {Order}
   */
  get(id) {
    return {};
  }
  /**
   * @param {Order} order
   * @returns {void}
   */
  save(order) {}
}

module.exports.OrderRepository = OrderRepository;
