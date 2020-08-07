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

  static create({ id, recipient, items }) {
    return Order.build({
      id,
      recipient,
      items,
      total: items.reduce((acc, item) => acc + item.subTotal, 0),
      status: Order.Statuses.PROCESSING,
    });
  }

  /**
   * @param {OrderFields} fields
   */
  static build(fields) {
    // * Order has a status
    // * An order should have a recipient's name, email, phone number & shipping address
    // * an order can only has at max 8 unique items
    // * Each item can only has at max 5 pieces
    // * Max order amount should not exceed 10,000

    return new Order(fields);
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
}

Order.Statuses = {
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
  DONE: 'DONE',
};

/**
 * @ValueObject
 */
class OrderRecipient {}

/**
 * @ValueObject
 */
class OrderItem {
  /**
   *
   * @param {Object} params
   * @param {Money} params.unitPrice
   * @param {string} params.name
   * @param {number} params.quantity
   */
  constructor({ unitPrice, name, quantity }) {
    this.unitPrice = unitPrice;
    this.name = name;
    this.quantity = quantity;
  }

  get subTotal() {
    return this.unitPrice.multiplyBy(this.quantity);
  }
}

// 這樣 export jsdoc 才吃得到
module.exports.Order = Order;
module.exports.OrderRecipient = OrderRecipient;
