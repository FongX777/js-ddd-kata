const AllowCurrencies = {
  TWD: 'TWD',
  USD: 'USD',
  JYP: 'JYP',
};

class Money {
  static get AllowCurrencies() {
    return AllowCurrencies;
  }

  /**
   * @param {object} fields
   * @param {number} fields.amount
   * @param {string} fields.currency
   */
  constructor({ amount, currency }) {
    if (amount < 0) {
      throw new Error('Money amount should not be negative');
    }
    if (!Money.AllowCurrencies[currency]) {
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
    if (moneyToAdd.currency !== this.currency) {
      throw new Error('Currency should be the same');
    }
    return new Money({
      amount: moneyToAdd.amount + this.amount,
      currency: moneyToAdd.currency,
    });
  }

  multiplyBy(num) {
    if (num <= 0) {
      throw new Error();
    }
    return new Money({
      amount: this.amount * num,
      currency: this.currency,
    });
  }
}

module.exports = { Money };
