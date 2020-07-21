async function products(parent, args, context, info) {
  const { dataSources } = context;
  const { mongodb } = dataSources;
  const { filter, limit } = args;
  context.audit = { action: 'SearchProducts', parameters: { filter, limit } };
  const productList = await mongodb.getProducts({ context, info }, args);
  return productList;
}

async function product(parent, args, context, info) {
  const { dataSources } = context;
  const { mongodb } = dataSources;
  const { id } = args;
  context.audit = { action: 'GetProductById', parameters: { id } };
  const oneProduct = await mongodb.getProductById({ context, info }, args);
  return oneProduct;
}

module.exports = {
  products,
  product,
};
