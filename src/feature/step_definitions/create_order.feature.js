const { CreateOrderUseCase } = require('../../use_case/order/create_order');
const { v4: uuidv4 } = require('uuid');
const {
  InMemOrderRepository,
} = require('../../use_case/__test__/repository/order_repo');

const getSampleItemParam = (unitPrice, q) =>
  CreateOrderUseCase.toItem({
    productId: uuidv4(),
    name: 'Test Product Name',
    quantity: q,
    unitPrice,
  });

const assert = require('assert');
const { Given, When, Then, Before } = require('cucumber');

Before(function () {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);
  this.orderRepo = orderRepo;
  this.usecase = usecase;
  this.input = {};
});

Given('the recipient information:', function (dataTable) {
  const recipientData = dataTable.hashes()[0];
  this.recipient = CreateOrderUseCase.toRecipient({
    name: recipientData.name,
    email: recipientData.email,
    phoneNumber: recipientData.phoneNumber,
    shippingAddress: recipientData.shippingAddress,
  });
});

Given(
  'a shopper has {int} products with total amount {int} in the cart',
  function (numOfItems, totalAmount) {
    const price = totalAmount / numOfItems;
    this.input.items = new Array(numOfItems).fill(getSampleItemParam(price, 1));
  }
);
Given('a shopper has 1 product with {int} quantity in the cart', function (
  quantity
) {
  this.input.items = new Array(1).fill(getSampleItemParam(100, quantity));
});

Given('the shopper has input enough recipient information', function () {
  this.input.recipient = this.recipient;
});

When('the cart is checked out', async function () {
  const result = await this.usecase.execute({
    items: this.input.items,
    recipient: this.input.recipient,
  });
  this.result = result;
});

Then('the order is created', function () {
  const order = this.result.order;
  assert.equal(order.id.length, 36);
});

Then('a paymentLink is created', function () {
  return '';
});

Then('the status should be {string}', function (expectedStatus) {
  const order = this.result.order;
  assert.equal(order.status, expectedStatus);
});

Then('the order should not be created', function () {
  const order = this.result.order;
  assert.equal(order, undefined);
});

Then('the error message should be {string}', function (expectedErrMsg) {
  const error = this.result.error;
  assert.equal(error.message, expectedErrMsg);
});
