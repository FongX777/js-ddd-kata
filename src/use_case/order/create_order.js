/** @typedef {import('../../domain/model/order').IOrderRepository} IOrderRepository */
const { Order } = require('../../domain/model/order');
const { v4: uuidv4 } = require('uuid');

class CreateOrderUseCase {
  /**
   *
   * @param {IOrderRepository} orderRepo
   */
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  static get ErrorCode() {
    return {
      PRODUCT_SHORTAGE: 'PRODUCT_SHORTAGE',
      INCORRECT_PARMS: 'INCORRECT_PARAMS',
      UNKWON_ERROR: 'UNKWON_ERROR',
    };
  }

  static toItem(data) {
    return {
      productId: data.productId,
      name: data.name,
      quantity: data.quantity,
      unitPrice: data.unitPrice,
    };
  }

  static toRecipient(data) {
    return {
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      shippingAddress: data.shippingAddress,
    };
  }

  /**
   * @param {Object} params
   * @param {Object[]} params.items
   * @param {string} params.items[].productId
   * @param {string} params.items[].name
   * @param {string} params.items[].quantity
   * @param {number} params.items[].unitPrice
   * @param {Object} params.recipient
   */
  async execute({ items, recipient }) {
    const [err, order] = Order.createDefault({
      id: uuidv4(),
      recipient: CreateOrderUseCase.toRecipient({
        name: recipient.name,
        email: recipient.email,
        phoneNumber: recipient.phoneNumber,
        shippingAddress: recipient.shippingAddress,
      }),
      items: items.map((item) => CreateOrderUseCase.toItem(item)),
      currency: 'TWD',
    });
    if (err) {
      return {
        error: {
          code: CreateOrderUseCase.ErrorCode.INCORRECT_PARMS,
          message: `[Create Order Error] ${err}`,
        },
      };
    }

    await this.orderRepo.save(order);

    return { order, error: undefined };
  }
}

module.exports = {
  CreateOrderUseCase,
};
