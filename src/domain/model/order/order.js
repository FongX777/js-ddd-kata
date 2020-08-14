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

  /**
   * 1. status processing
   * 2. items length <= 8
   * 3. each item quantity <= 5
   * @returns {[string, Order]}
   */
  static create({ id, recipient, items, currency }) {
    if (!id) {
      return ['no id', undefined];
    }
    const [err, order] = Order.build({
      id,
      recipient,
      items: items.map(
        (item) =>
          new OrderItem({
            unitPrice: item.unitPrice,
            name: item.name,
            quantity: item.quantity,
          })
      ),
      total: new Money({
        amount: items.reduce((acc, item) => acc + item.subTotal, 0),
        currency,
      }),
      status: Order.Statuses.PROCESSING,
    });
    if (err) {
      return [err, undefined];
    }
    return [undefined, order];
  }

  /**
   * @param {OrderFields} fields
   * @returns {[string, Order]}
   */
  static build(fields) {
    if (fields.items.length > 8) {
      return ['Max 8 items', undefined];
    }
    // * Order has a status
    // * An order should have a recipient's name, email, phone number & shipping address
    // * an order can only has at max 8 unique items
    // * Each item can only has at max 5 pieces
    // * Max order amount should not exceed 10,000

    return [undefined, new Order(fields)];
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
  PROCESSING: 'PROCESSING',
  PAID: 'PAID',
  SHIPPED: 'SHIPPED',
  DONE: 'DONE',
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
    if (!name) {
      throw new Error('Invalid name');
    }
    if (!email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (phoneNumber.length !== 10) {
      throw new Error('Invalid phone');
    }
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.shippingAddress = shippingAddress;
  }
}

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
