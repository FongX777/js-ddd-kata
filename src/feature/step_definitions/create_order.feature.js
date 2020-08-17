const { Order } = require('../../domain/model/order');
const { CreateOrderUseCase } = require('../../use_case/order/create_order');
const {
  InMemOrderRepository,
} = require('../../use_case/__test__/repository/order_repo');

const getSampleRecipientParam = () =>
  CreateOrderUseCase.toRecipient({
    name: 'Bella Recipient',
    email: 'bella@meepshop.com',
    phoneNumber: '0987121212',
    shippingAddress: 'Taipei District Xinyi Renai Road No 188',
  });
const getSampleItemParam = () =>
  CreateOrderUseCase.toItem({
    productId: '32e5d058-398d-483f-a7d1-92e5af4e81db',
    name: 'Test Product Name',
    quantity: 3,
    unitPrice: 10,
  });

const assert = require('assert');
const { Given, When, Then, Before } = require('cucumber');

Before(function () {
  const orderRepo = new InMemOrderRepository();
  const usecase = new CreateOrderUseCase(orderRepo);
  this.orderRepo = orderRepo;
  this.usecase = usecase;
});

Given(
  'a shopper has had one product A and one product B in the cart',
  function () {
    this.input = {};
    this.input.items = [getSampleItemParam(), getSampleItemParam()];
  }
);

Given('the total order amount is {float}', function (float) {});

Given('the shopper has input recipient information', function (dataTable) {
  this.input.recipient = getSampleRecipientParam();
});

When('the cart is checked out', async function () {
  // Write code here that turns the phrase above into concrete actions
  const result = await this.usecase.execute({
    items: this.input.items,
    recipient: this.input.recipient,
  });
  this.result = result;
});

Then('the order is created', function () {
  // Write code here that turns the phrase above into concrete actions
  assert.equal(this.result.error, undefined);
  const order = this.orderRepo.getFirstOne();
  assert.notEqual(order, undefined);
});

Then('a paymentLink is created', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

Then('the status should be {string}', function (string) {
  const order = this.orderRepo.getFirstOne();
  assert.equal(this.result.order.status, string);
  assert.equal(order.status, string);
});

Given('a shopper has {int} products in the cart', function (numOfItems) {
  this.input = {};
  this.input.items = new Array(numOfItems).fill(getSampleItemParam());
});

// Given('the total order amount is {int}', function (int) {
// // Given('the total order amount is {float}', function (float) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

Given('the shopper has input enough recipient information', function () {
  this.input.recipient = getSampleRecipientParam();
});

Then('the order should not be created', function () {
  const order = this.result.order;
  assert.equal(order, undefined);
});

Then('the error message should be {string}', function (msg) {
  const error = this.result.error;
  assert.equal(error.message, msg);
});

// Given('a shopper has {int} a products in the cart', function (int) {
// // Given('a shopper has {float} a products in the cart', function (float) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Given('the total order amount is {int}', function (int) {
// // Given('the total order amount is {float}', function (float) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Given('the shopper has input enough recipient information', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// When('the cart is checked out', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the order should not be created', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the error message should be {string}', function (string) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Given('a shopper has {int} a products with total {int},{int} in the cart', function (int, int2, int3) {
// // Given('a shopper has {int} a products with total {int},{float} in the cart', function (int, int2, float) {
// // Given('a shopper has {int} a products with total {float},{int} in the cart', function (int, float, int2) {
// // Given('a shopper has {int} a products with total {float},{float} in the cart', function (int, float, float2) {
// // Given('a shopper has {float} a products with total {int},{int} in the cart', function (float, int, int2) {
// // Given('a shopper has {float} a products with total {int},{float} in the cart', function (float, int, float2) {
// // Given('a shopper has {float} a products with total {float},{int} in the cart', function (float, float2, int) {
// // Given('a shopper has {float} a products with total {float},{float} in the cart', function (float, float2, float3) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Given('the shopper has input enough recipient information', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// When('the cart is checked out', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the order should not be created', function () {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });

// Then('the error message should be {string}', function (string) {
//   // Write code here that turns the phrase above into concrete actions
//   return 'pending';
// });
