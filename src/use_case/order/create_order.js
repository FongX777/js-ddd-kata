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
    // TODO: create & save to repository
  }
}

module.exports = {
  CreateOrderUseCase,
};
