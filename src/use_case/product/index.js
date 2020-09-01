const { v4: uuidv4 } = require('uuid');

async function createProduct({
  purchaseSettingRepo,
  productRepo,
  inventoryItemRepo,
  data,
}) {
  if (data.name.length > 100) {
    return { error: '[input error] length of name should <= 100' };
  }
  if (data.sku.length > 20) {
    return { error: '[input error] length of sku should <= 20' };
  }
  if (data.price > 1000000) {
    return { error: '[input error] max price should <= 1000k' };
  }
  if (data.stock < 0) {
    return { error: '[input error] stock should >= 0' };
  }
  const allProducts = await productRepo.getAll();
  if (allProducts.some((p) => p.name === data.name)) {
    return { error: `[input error] name '${data.name}' has already been used` };
  }

  const purchaseSetting = await purchaseSettingRepo.get();
  if (!purchaseSetting) {
    return { error: 'purchaseSetting not found' };
  }
  const { currency } = purchaseSetting;

  const product = {
    id: uuidv4(),
    name: data.name,
    unitPrice: {
      amount: data.price,
      currency,
    },
    available: false,
  };
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
