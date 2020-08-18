/** @typedef {import('../../domain/model/order').IOrderRepository} IOrderRepository */
const { Order } = require('../../domain/model/order');
const { v4: uuidv4 } = require('uuid');

class CreateOrderUseCase {
  /**
   *
   * @param {IOrderRepository} orderRepo
   */
  constructor(orderRepo, productRepo) {
    this.orderRepo = orderRepo;
    this.productRepo = productRepo;
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
    let shortage = false;
    await Promise.all(
      items.map(async (item) => {
        const productId = item.productId;
        const hasQuantity = await this.productRepo.checkQuantity({
          id: productId,
          quantity: item.quantity,
        });
        if (!hasQuantity) {
          shortage = true;
        }
      })
    );

    if (shortage) {
      return {
        error: {
          code: CreateOrderUseCase.ErrorCode.PRODUCT_SHORTAGE,
          message: '[Create Order Error] product shortage',
        },
      };
    }

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
