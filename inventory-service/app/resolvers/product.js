const _ = require('lodash');
const graphqlFields = require('graphql-fields');

async function __resolveReference(product, { loaders }, info) {
  const selectedFields = _.keys(graphqlFields(info));
  const loadedProduct = await loaders.product.load(JSON.stringify({ sku: product.sku, selectedFields }));
  return loadedProduct;
}
module.exports = {
  __resolveReference,
};
