const _ = require('lodash');
const faker = require('faker');
const Product = require('../../app/datasources/mongodb/models/Product');

async function seedProduct({
  providedName,
  providedBranch,
} = {}) {
  const product = new Product({
    sku: faker.random.number(),
    name: providedName || faker.commerce.productName(),
    price: faker.commerce.price(),
    branch: providedBranch || faker.commerce.productMaterial(),
    colour: faker.commerce.color(),
  });
  await product.save();
  return product;
}

async function seedProducts(count = 1) {
  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(seedProduct());
  }
  return Promise.all(promises);
}

async function seedProductsWithName(name, count = 1) {
  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(seedProduct({ providedName: name }));
  }
  return Promise.all(promises);
}

async function seedProductsWithBranch(branch, count = 1) {
  const promises = [];
  for (let i = 0; i < count; i += 1) {
    promises.push(seedProduct({ providedBranch: branch }));
  }
  return Promise.all(promises);
}

function productSortBy(products, field = 'price', sortDirection = 'asc') {
  for (let i = 1; i < products.length; i += 1) {
    const prev = products[i - 1];
    const current = products[i];
    if (sortDirection === 'asc') {
      if (prev[`${field}`] > current[`${field}`]) {
        return false;
      }
    } else if (prev[`${field}`] < current[`${field}`]) {
      return false;
    }
  }
  return true;
}

function productFieldMatch(products, field = 'name', pattern) {
  const regExp = new RegExp(pattern, 'i');
  return _.every(products, product => regExp.test(product[`${field}`]));
}

function productInPriceRange(products, { from, to }) {
  return _.every(products, product => product.price >= from && product.price <= to);
}

module.exports = {
  seedProducts,
  seedProductsWithName,
  seedProductsWithBranch,
  productSortBy,
  productFieldMatch,
  productInPriceRange,
};
