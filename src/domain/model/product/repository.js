/** @typedef {import('./product').Product} Product */

class IProductRepository {
  /**
   * @param {string} id
   * @returns {Promise.<Product>}
   */
  async get(id) {
    throw new Error('Not Implemented');
  }

  /**
   * @param {Product} product
   * @returns {Promise.<void>}
   */
  async save(product) {
    throw new Error('Not Implemented');
  }
}

module.exports.IProductRepository = IProductRepository;
