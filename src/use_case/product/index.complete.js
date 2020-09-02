const { Money } = require('../../domain/model/money');
const { v4: uuidv4 } = require('uuid');

/**
 * @typedef {Object} ProductFields
 * @property {string} id
 * @property {string} name
 * @property {string} sku
 * @property {Money} unitPrice
 * @property {boolean} available
 */
class Product {
  /**
   *
   * @param {ProductFields} fields
   */
  constructor(fields) {
    this._fields = fields;
  }

  get id() {
    return this._fields.id;
  }

  get name() {
    return this._fields.name;
  }

  get sku() {
    return this._fields.sku;
  }

  get unitPrice() {
    return this._fields.unitPrice;
  }

  get available() {
    return this._fields.available;
  }

  /**
   * @param {ProductFields} params
   */
  static build({ id, name, sku, unitPrice, available }) {
    if (name.length > 100) {
      return ['[input error] length of name should <= 100'];
    }
    if (sku.length > 20) {
      return ['[input error] length of sku should <= 20'];
    }
    if (unitPrice.amount > 1000000) {
      return ['[input error] max price should <= 1000k'];
    }
    return [undefined, new Product({ id, name, sku, unitPrice, available })];
  }

  static createDefault({ id, name, sku, price, currency }) {
    return this.build({
      id,
      name,
      sku,
      unitPrice: new Money({ amount: price, currency }),
      available: false,
    });
  }
}

/**
 * @typedef {Object} PurchaseSettingFields
 * @property {string} id
 * @property {string} currency
 */
class PurchaseSetting {
  /**
   *
   * @param {PurchaseSettingFields} fields
   */
  constructor(fields) {
    this._fields = fields;
  }

  get id() {
    return this._fields.id;
  }

  get currency() {
    return this._fields.currency;
  }
}

async function createProduct({
  purchaseSettingRepo,
  productRepo,
  inventoryItemRepo,
  data,
}) {
  if (data.stock < 0) {
    return { error: '[input error] stock should >= 0' };
  }
  const nameDuplicate = await productRepo.isNameDuplicate(data.name);
  if (nameDuplicate) {
    return { error: `[input error] name '${data.name}' has already been used` };
  }

  const purchaseSetting = await purchaseSettingRepo.get();
  if (!purchaseSetting) {
    return { error: 'purchaseSetting not found' };
  }
  const { currency } = purchaseSetting;

  const [errorResult, product] = Product.createDefault({
    id: uuidv4(),
    ...data,
    currency,
  });
  if (errorResult) {
    return { error: errorResult };
  }

  const inventoryItem = {
    id: product.id,
    stock: data.stock,
  };

  const newProduct = await productRepo.insertNewProduct(product);
  const newInventoryItem = await inventoryItemRepo.save(inventoryItem);

  return {
    product: {
      id: newProduct.id,
      name: newProduct.name,
      unitPrice: newProduct.unitPrice,
      available: newProduct.available,
      stock: newInventoryItem.stock,
    },
  };
}

module.exports.createProduct = createProduct;
