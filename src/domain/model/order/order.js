const { Money } = require('../money');

/**
 * @Entity
 * @typedef {Object} OrderFields
 * @property {string} id
 * @property {OrderRecipient} recipient
 * @property {OrderItem[]} items
 * @property {Money} total
 * @property {string} status
 */
class Order {
  /**
   * @param {OrderFields} fields
   */
  constructor(fields) {
    this._fields = fields;
  }

  static MaxAmount() {
    return new Money({
      amount: 100000,
      currency: Money.AllowCurrencies.TWD,
    });
  }

  /**
   * NOTE: this function is built for client
   * 1. status processing
   * 2. items length <= 8
   * 3. each item quantity <= 5
   * @returns {[string, Order]}
   */
  static createDefault({ id, recipient, items, currency }) {
    // TODO: implement it
  }

  /**
   * Note: This function is built mainly for internal usage
   * @param {OrderFields} fields
   * @returns {[string, Order]}
   */
  static build(fields) {
    // TODO: implement it
  }

  get id() {
    return this._fields.id;
  }

  get recipient() {
    return this._fields.recipient;
  }

  get items() {
    return this._fields.items;
  }

  get total() {
    return this._fields.total;
  }

  get status() {
    return this._fields.status;
  }
}

Order.Statuses = {
  // TODO: implement it
};

/**
 * @ValueObject
 */
class OrderRecipient {
  /**
   *
   * @param {Object} fields
   * @param {string} fields.name
   * @param {string} fields.email
   * @param {string} fields.phoneNumber
   * @param {string} fields.shippingAddress
   */
  constructor({ name, email, phoneNumber, shippingAddress }) {
    // TODO: implement it
  }
}

/**
 * @ValueObject
 */
class OrderItem {
  /**
   *
   * @param {Object} params
   * @param {string} params.productId
   * @param {Money} params.unitPrice
   * @param {string} params.name
   * @param {number} params.quantity
   */
  constructor({ unitPrice, name, quantity, productId }) {
    // TODO: implement it
  }
}

// 這樣 export jsdoc 才吃得到
module.exports.Order = Order;
module.exports.OrderRecipient = OrderRecipient;
