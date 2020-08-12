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

  execute({ items, recipient }) {
    const [err, order] = Order.create({
      id: uuidv4(),
      recipient: {
        name: recipient.name,
        email: recipient.email,
        phoneNumber: recipient.phoneNumber,
        shippingAddress: recipient.shippingAddress,
      },
      items: [],
    });
    if (err) {
      return {
        error: 'Create Order Error: ' + err,
      };
    }

    return {
      order,
      error: undefined,
    };
  }
}

module.exports = {
  CreateOrderUseCase,
};
