Feature: Shopper Places an order

    As a shopper,
    I want to place an order,
    so that I can buy things I want.

    Constraints:
    * Order has an init status 'PROCESSING'
    * An order should have a recipient's name, email, phone number & shipping address
    * an order can only has at max 8 unique items
    * Maximum qauntity of each item is 5
    * Max order amount should not exceed 10,0000

  Background:
    Given the recipient information:
      | name | email         | phoneNumber | shippingAddress          |
      | Sam  | sam@gmail.com | 0912121212  | Taipei Xinyi Road No 10. |


  Scenario: Once the cart is checked out, an order is created
    Given a shopper has 2 products with total amount 1000 in the cart
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order is created
    And a paymentLink is created
    And the status should be "PROCESSING"

  Scenario: Max 8 unique items in one order
    Given a shopper has 9 products with total amount 1000 in the cart
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order should not be created
    And the error message should be "[Create Order Error] Max 8 items"


  Scenario: Each item can only has at max 5 quantity
    Given a shopper has 1 product with 6 quantity in the cart
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order should not be created
    And the error message should be "[Create Order Error] Item 'Test Product Name' has invalid quantity '6'"

  Scenario: Max order amount should not exceed 10,0000
    Given a shopper has 6 products with total amount 100001 in the cart
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order should not be created
    And the error message should be "[Create Order Error] Order amount should not surpass 10,0000"




