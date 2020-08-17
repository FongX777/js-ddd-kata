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
    if (!id) {
      return ['no id', undefined];
    }
    const [err, order] = Order.build({
      id,
      recipient,
      items: items.map(
        (item) =>
          new OrderItem({
            unitPrice: new Money({ amount: item.unitPrice, currency }),
            name: item.name,
            quantity: item.quantity,
            productId: item.productId,
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
   * Note: This function is built mainly for internal usage
   * @param {OrderFields} fields
   * @returns {[string, Order]}
   */
  static build(fields) {
    if (fields.items.length === 0) {
      return ['Min 1 item', undefined];
    }
    if (fields.items.length > 8) {
      return ['Max 8 items', undefined];
    }
    const checkItemQuantity = (item) => item.quantity > 0 && item.quantity < 5;
    const invalidItem = fields.items.find((item) => !checkItemQuantity(item));
    if (invalidItem) {
      return [
        `Item '${invalidItem.name}' has invalid quantity '${invalidItem.quantity}'`,
        undefined,
      ];
    }

    const totalAmount = fields.items.reduce(
      (total, item) => total.add(item.subTotal),
      new Money({ amount: 0, currency: Money.AllowCurrencies.TWD })
    );
    if (totalAmount.higherThan(Order.MaxAmount())) {
      return ['Order amount should not surpass 10,0000', undefined];
    }

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
   * @param {string} params.productId
   * @param {Money} params.unitPrice
   * @param {string} params.name
   * @param {number} params.quantity
   */
  constructor({ unitPrice, name, quantity, productId }) {
    this.unitPrice = unitPrice;
    this.name = name;
    this.quantity = quantity;
    this.productId = productId;
  }

  get subTotal() {
    return this.unitPrice.multiplyBy(this.quantity);
  }
}

// 這樣 export jsdoc 才吃得到
module.exports.Order = Order;
module.exports.OrderRecipient = OrderRecipient;
