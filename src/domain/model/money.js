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
    return new Money({
      amount: moneyToAdd.amount + this.amount,
      currency: moneyToAdd.currency,
    });
  }

  /**
   * @param {number} num
   * @returns {Money}
   */
  multiplyBy(num) {
    // TODO: implement it
  }

  /**
   *
   * @param {Money} targetMoney
   * @returns {Boolean}
   */
  higherThan(targetMoney) {
    // TODO: check currency equivalence
    // TODO: implement it
  }
}

module.exports = { Money };
