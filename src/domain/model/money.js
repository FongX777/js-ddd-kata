class Money {
  /**
   * @param {object} fields
   * @param {number} fields.amount
   * @param {string} fields.currency
   */
  constructor({ amount, currency }) {
    if (amount < 0) {
      throw new Error('Money amount should not be negative');
    }
    if (!currency) {
      throw new Error('Money currency is not allowed');
    }
    this.amount = amount;
    this.currency = currency;
  }

  /**
   *
   * @param {Money} moneyToAdd
   */
  add(moneyToAdd) {
    // TODO: check currency equivalence
    return new Money({
      amount: moneyToAdd.amount + this.amount,
      currency: moneyToAdd.currency,
    });
  }

  multiplyBy(num) {
    if (num < 0) {
      throw new Error();
    }
    return new Money({
      amount: this.amount * num,
      currency: this.currency,
    });
  }
}

module.exports = { Money };
