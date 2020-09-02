/**
 * 1. product has name (max 100 length), sku (optional, max 20 length), unitPrice (max 1000k), available (boolean)
 * 2. product inventory item shoud be a positive int stock
 * 3. newly created products are unavailable
 * 4. product name should be uniq
 * 5. the product price currency should be depended on store purchasing setting (currency)
 */

const test = require('ava').default;
const { createProduct } = require('../product/index.complete');

const productRepo = {
  db: {
    '9df1a561-81ef-435c-ad6b-d68a3399299d': {
      id: '9df1a561-81ef-435c-ad6b-d68a3399299d',
      name: 'Future Usability Specialist',
      unitPrice: { amount: 1000, currency: 'USD' },
      available: true,
    },
    'qqf00001-811f-ad6b-435c-968a339299dd': {
      id: 'qqf00001-811f-ad6b-435c-968a339299dd',
      name: 'Giovanny',
      unitPrice: { amount: 63.1, currency: 'USD' },
      available: false,
    },
    'a1d1ocdp-ad6b-811f-c68a3-943539299dd': {
      id: 'a1d1ocdp-ad6b-811f-c68a3-943539299dd',
      name: 'keyforge',
      unitPrice: { amount: 10, currency: 'USD' },
      available: true,
    },
  },
  getAll() {
    return Object.values(this.db);
  },
  insertNewProduct(data) {
    this.db[data.id] = data;
    return data;
  },
  isNameDuplicate(name) {
    const allProducts = this.getAll();
    // return false;
    return allProducts.some((p) => p.name === name);
  },
};
const purchaseSettingRepo = {
  db: {},
  get() {
    return {
      id: '92548FBE-1E37-4A92-8FC6-29E1D9294DD0',
      currency: 'USD',
    };
  },
  insertPurseSetting(data) {
    this.db[data.id] = data;
    return data;
  },
};
const inventoryItemRepo = {
  db: {
    '9df1a561-81ef-435c-ad6b-d68a3399299d': {
      id: '9df1a561-81ef-435c-ad6b-d68a3399299d',
      stock: 100,
    },
    'qqf00001-811f-ad6b-435c-968a339299dd': {
      id: 'qqf00001-811f-ad6b-435c-968a339299dd',
      stock: 20,
    },
    'a1d1ocdp-ad6b-811f-c68a3-943539299dd': {
      id: 'a1d1ocdp-ad6b-811f-c68a3-943539299dd',
      stock: 300,
    },
  },
  async save(data) {
    this.db[data.id] = data;
    return data;
  },
};

test('name: max 100 length', async (t) => {
  const bigName = new Array(1000).fill('0');
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: bigName, sku: '123', price: 1000, stock: 10 },
  });
  t.is(result.error, '[input error] length of name should <= 100');
});

test('sku: max 20 length', async (t) => {
  const bigSku = new Array(1000).fill('0');
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: 'normal name', sku: bigSku, price: 1000, stock: 10 },
  });
  t.is(result.error, '[input error] length of sku should <= 20');
});

test('price: max 1000k', async (t) => {
  const bigPrice = 1000 * 1000 + 1;
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: 'normal name', sku: 'A01', price: bigPrice, sotck: 10 },
  });
  t.is(result.error, '[input error] max price should <= 1000k');
});

test('inventory stock: positve int', async (t) => {
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: 'normal name', sku: 'A01', price: 1000, stock: -10 },
  });
  t.is(result.error, '[input error] stock should >= 0');
});

test('default available false', async (t) => {
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: 'normal name', sku: 'A01', price: 1000, stock: 10 },
  });
  t.is(result.product.available, false);
});

test('product currency should be the same as store setting allowed', async (t) => {
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: 'normal name', sku: 'A01', price: 1000, stock: 10 },
  });
  t.is(result.product.id.length, 36);
  t.is(result.product.unitPrice.currency, 'USD');
  t.is(result.product.stock, 10);
});

test('product name should be uniq', async (t) => {
  const result = await createProduct({
    productRepo,
    purchaseSettingRepo,
    inventoryItemRepo,
    data: { name: 'keyforge', sku: 'A01', price: 1000, stock: 10 },
  });
  t.is(result.error, "[input error] name 'keyforge' has already been used");
});
