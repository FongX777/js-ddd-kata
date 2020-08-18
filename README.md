# JS DDD Kata

## Get Started

```bash
npm install
```

## TDD Kata

---

## ⓵ Value Object Exercises

`src/domain/model/money.js`: `Money`

### Complete functions below:

- `add(moneyToAdd: Money): Money`
- `multiplyBy(num: number): Money`

`src/domain/model/order/order.js`

### Add new Value Objects

`OrderItem`:

- fields: (`<name>:<type>`:constraints)
  - `productId:string`: nullable
  - `unitPrice:Money`: non-nullable
  - `name:string`: non-empty
  - `quantity:number`: > 0
- getter:
  - `subTotal: Money` unitPrice x quantity

`OrderRecipient`:

- fields
  - `name:string`: non-empty, length < 60
  - `email:string`: non-empty, length <= 50
  - `phoneNumber:string`: non-empty, length <= 20
  - `shippingAddress:string`: non-empty, length <= 200

### Value Object Challenges

- Refactor: Make `email` a Value Object

## Entity/Aggregate

`Order`:

- fields:

  - `@typedef {Object} OrderFields`
  - `@property {string} id`
  - `@property {OrderRecipient} recipient`
  - `@property {OrderItem[]} items`
  - `@property {Money} total`
  - `@property {string} status`

1. Define fields - use jsdoc to define fields & getter

```js
class Entity {
  constructor(fields) {
    this._fields = fields;
  }
}
```

2. Define enums (order status enum1) (???)
   - enums: 'PROCESSING', 'PAID', 'SHIPPED', 'DONE'

```js
Order.Statuses = {
  PROCESSING: 'PROCESSING',
  // ...
};
```

3. static `build` method to fulfill the requirements (invariants)

   - An order should have a recipient's name, email, phone number & shipping address
   - an order can only has at max 8 unique items
   - Maximum qauntity of each item is 5
   - Max order amount should not exceed 10,0000
     - Add new method `higherThan(targetMoney: Money): boolean` to `Money`

4. static `createDefault` method to fulfill the requirements (invariants)
   - Order has an init status 'PROCESSING'

## Repository

1. Write a repository interface for `OrderRepository`

```js
class IOrderRepository {
  /**
   * @param {string} id
   * @returns {Promise.<Order>}
   */
  async get(id) {
    throw new Error('Not Implemented');
  }

  /**
   * @param {Order} order
   * @returns {Promise.<void>}
   */
  async save(order) {
    throw new Error('Not Implemented');
  }
}
```

2. Fake repo for test cases

go to `src/use_case/__test__/repository`, starts with:

```js
/** @typedef {import('../../../domain/model/order').Order} Order */
const { IOrderRepository } = require('../../../domain/model/order');

class InMemOrderRepository extends IOrderRepository {
  constructor() {
    super();
    this.db = {};
  }

  async get(id) {
    // TODO
  }

  async save(data) {
    // TODO
  }
}
```

## Use Case Testing

1. Follow the feature files (acceptance creteria)
2. Write the first test case
3. Pass it
4. Refactor
