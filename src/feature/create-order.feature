Feature: Shopper Place an order

    As a shopper,
    I want to place an order,
    so that I can buy things I want.

    Constraints:
    * Order has a status
    * An order should have a recipient's name, email, phone number & shipping address
    * an order can only has at max 8 unique items
    * Each item can only has at max 5 pieces
    * Max order amount should not exceed 10,000


  Scenario: Once the cart is checked out, an order is created
    Given a shopper has had one product A and one product B in the cart
    And the total order amount is 1000
    And the shopper has input recipient information
      | name | email         | phoneNumber | shippingAddress          |
      | Sam  | sam@gmail.com | 0912121212  | Taipei Xinyi Road No 10. |
    When the cart is checked out
    Then the order is created
    And a paymentLink is created
    And the status should be 'PROCESSING'

  Scenario: Max 8 unique items in one order
    Given a shopper has 9 products in the cart
    And the total order amount is 1000
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order should not be created
    And the error message should be 'Exceed Max Unique Items Allowed'


  Scenario: Each item can only has at max 5 pieces
    Given a shopper has 6 a products in the cart
    And the total order amount is 1000
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order should not be created
    And the error message should be 'Exceed Max Items Purchase Limit Allowed'

  Scenario: Max order amount should not exceed 10,000
    Given a shopper has 6 a products with total 10,001 in the cart
    And the shopper has input enough recipient information
    When the cart is checked out
    Then the order should not be created
    And the error message should be 'Exceed Max Order Amount Allowed'




