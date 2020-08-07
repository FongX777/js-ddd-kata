/** @typedef {import('../../domain/model/order').IOrderRepository} IOrderRepository */
const { Order } = require('../../domain/model/order');

class CreateOrderUseCase {
  /**
   *
   * @param {IOrderRepository} orderRepo
   */
  constructor(orderRepo) {
    this.orderRepo = orderRepo;
  }

  execute({
    items,
    recipient,

    // And the total order amount is 1000
    // And the shopper has input recipient information
    //   | name | email         | phoneNumber | shippingAddress          |
    //   | Sam  | sam@gmail.com | 0912121212  | Taipei Xinyi Road No 10. |
    // When the cart is checked out
    // Then the order is created
    // And a paymentLink is created
    // And the status should be 'PROCESSING'
  }) {
    const order = Order.create;
    return '';
  }
}
