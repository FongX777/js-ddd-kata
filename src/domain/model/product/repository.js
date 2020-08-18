/** @typedef {import('./product').Product} Product */

class IOrderRepository {
  /**
   * @param {string} id
   * @returns {Promise.<Product>}
   */
  async get(id) {
    throw new Error('Not Implemented');
  }

  /**
   * @param {Product} order
   * @returns {Promise.<void>}
   */
  async save(order) {
    throw new Error('Not Implemented');
  }
}

module.exports.IOrderRepository = IOrderRepository;
