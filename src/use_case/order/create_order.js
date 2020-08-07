/** @typedef {import('../../domain/model/order').IOrderRepository} IOrderRepository */
const { Order } = require('../../domain/model/order');
const uuidv4 = require('uuid/v4');

class CreateOrderUseCase {
  /**
   *
   * @param {IOrderRepository} orderRepo
   */
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  execute({ items, recipient }) {
    const order = Order.create({
      id: uuidv4(),
      recipient: {
        name: recipient.name,
        email: recipient.email,
        phoneNumber: recipient.phoneNumber,
        shippingAddress: recipient.shippingAddress,
      },
      items: [],
    });

    return {
      order,
      error: undefined,
    };
  }
}
