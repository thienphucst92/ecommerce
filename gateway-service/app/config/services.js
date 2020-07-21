module.exports = {
  serviceList: [
    {
      name: 'product-service',
      url: process.env.PRODUCT_SERVICE || 'http://localhost:6777/graphql',
    },
    {
      name: 'inventory-service',
      url: process.env.INVENTORY_SERVICE || 'http://localhost:6778/graphql',
    },
  ],
};
