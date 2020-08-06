/**
 * @Entity
 * @typedef {Object} OrderFields
 * @property {string} id
 * @property {OrderRecipient} recipient
 * @property {OrderItem[]} items
 * @property {Money}
 */
class Order {}

/**
 * @ValueObject
 */
class OrderRecipient {}

/**
 * @ValueObject
 */
class OrderItem {}

class Money {}

module.exports = {
  Order,
  OrderRecipient,
};
