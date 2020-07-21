const DataLoader = require('dataloader');
const loaders = require('../../datasources/mongodb/utils/loaders');

function createLoaders() {
  return {
    product: new DataLoader(keys => loaders.batchProducts(keys)),
  };
}

module.exports = {
  createLoaders,
};
