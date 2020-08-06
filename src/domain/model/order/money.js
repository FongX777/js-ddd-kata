class Money {
  /**
   * @param {object} fields
   * @param {number} fields.amount
   * @param {string} fields.currency
   */
  constructor({ amount, currency }) {
    this.amount = amount;
    this.currency = currency;
  }
}

module.exports = { Money };
