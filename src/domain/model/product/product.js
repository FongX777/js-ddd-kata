const { Money } = require('../money');

/**
 * @typedef {Object} ProductFields
 * @property {string} id
 * @property {string} name
 * @property {number} stock
 * @property {Money} unitPrice
 * @property {boolean} available
 */
class Product {
  /**
   *
   * @param {ProductFields} fields
   */
  constructor(fields) {
    this._fields = fields;
  }

  /**
   * @param {ProductFields} fields
   * @returns {[string, Product]} [error, Product]
   */
  static build(fields) {
    if (!fields.id) {
      return ['Need id', undefined];
    }
    if (!fields.name || fields.name.length > 100) {
      return ['Need name', undefined];
    }
    if (fields.stock < 0) {
      return ['stock should >= 0', undefined];
    }
    if (fields.unitPrice.amount <= 0) {
      return ['Invalid Unit Price', undefined];
    }

    return [undefined, new Product(fields)];
  }

  /**
   * @param {ProductFields} params
   * @returns {[string, Product]} [error, Product]
   */
  static createDefault(params) {
    const unitPrice = new Money({
      currency: params.unitPrice.currency,
      amount: params.unitPrice.amount,
    });

    const [err, product] = Product.build(params);
    if (err) {
      return [err, undefined];
    }
    return [undefined, product];
  }

  get id() {
    return this._fields.id;
  }

  get name() {
    return this._fields.name;
  }

  get stock() {
    return this._fields.stock;
  }

  get unitPrice() {
    return this._fields.unitPrice;
  }

  get available() {
    return this._fields.available;
  }
}

module.exports.Product = Product;
