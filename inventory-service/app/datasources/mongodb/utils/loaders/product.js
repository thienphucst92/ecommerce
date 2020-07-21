const _ = require('lodash');
const Product = require('../../models/Product');

async function batchProducts(keys) {
  let mergeSelectedFields = [];
  const productSkuList = _.map(keys, (key) => {
    const { sku, selectedFields } = JSON.parse(key);
    mergeSelectedFields = _.union(mergeSelectedFields, selectedFields);
    return sku;
  });

  const selectedFieldsString = mergeSelectedFields.join(' ');
  const products = await Product.find({
    sku: { $in: productSkuList },
  })
    .select(`sku ${selectedFieldsString}` || '-__v')
    .lean();

  logger.info('DEBUG products =>', { products });

  const productList = _.map(productSkuList, (sku) => {
    const product = _.find(products, x => x.sku === sku);
    logger.info('DEBUG products =>', { product });
    return product;
  });
  // logger.info('DEBUG products =>', { selectedFieldsString, productList });

  return productList;
}

module.exports = {
  batchProducts,
};
