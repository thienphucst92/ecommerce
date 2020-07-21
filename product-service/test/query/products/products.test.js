const requireGraphQLFile = require('require-graphql-file');
const assert = require('assert');
const request = require('supertest');
const _ = require('lodash');
const app = require('../../../app/app');

const { seedProducts, seedProductsWithName, productSortBy, productFieldMatch,
  productInPriceRange, seedProductsWithBranch } = require('../../helpers');

const LIST_PRODUCT = requireGraphQLFile('./products.graphql');

describe('Testing: List Products - ', () => {
  beforeEach(async () => {
    await seedProducts(50);
  });

  it('Expect Success - Default Searching', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
        },
      });
    const { products } = res.body.data;
    assert.equal(products.length, 10);
    assert(productSortBy(products, 'price', 'asc'));
  });

  it('Expect Success - Search Product By Name', async () => {
    await seedProductsWithName('iPhone', 50);

    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            name: 'iPhone',
          },
          limit: 20,
        },
      });
    const { products } = res.body.data;
    assert.equal(products.length, 20);
    assert(productFieldMatch(products, 'name', 'iPhone'));
    assert(productSortBy(products, 'price', 'asc'));
  });

  it('Expect Success - Search Product By Price', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            priceRange: {
              from: 500,
              to: 2000,
            },
          },
        },
      });
    const { products } = res.body.data;
    assert.equal(products.length, 10);
    assert(productInPriceRange(products, { from: 500, to: 2000 }));
    assert(productSortBy(products, 'price', 'asc'));
  });

  it('Expect Success - Search Product By Branch', async () => {
    await seedProductsWithBranch('apple', 50);
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            branch: 'apple',
          },
        },
      });

    const { products } = res.body.data;
    assert.equal(products.length, 10);
    assert(productFieldMatch(products, 'branch', 'apple'));
    assert(productSortBy(products, 'price', 'asc'));
  });

  it('Expect Success - Sort By Name', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            sortBy: 'name',
          },
          limit: 20,
        },
      });

    const { products } = res.body.data;
    assert.equal(products.length, 20);
    assert(productSortBy(products, 'name', 'asc'));
  });

  it('Expect Success - Pagination', async () => {
    const page1 = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
          },
          limit: 10,
        },
      });
    const { products } = page1.body.data;
    const cursor = products[products.length - 1].price;

    const page2 = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            cursor,
          },
          limit: 10,
        },
      });
    const { products: productsPage2 } = page2.body.data;
    logger.info('DEBUG products =>', { productsPage2 });
    assert.equal(productsPage2.length, 10);
    assert(productSortBy(products, 'price', 'asc'));
    assert(_.every(productsPage2, product => product.price >= cursor));
  });

  it('Expect Fail - Invalid sort by field', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            sortBy: 'unknown field',
          },
        },
      });
    const { errors } = res.body;
    assert(errors);
  });

  it('Expect Fail - Invalid sort direction', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            sortBy: 'price',
            sortDirection: 'invalid sort direction',
          },
        },
      });
    const { errors } = res.body;
    assert(errors);
  });

  it('Expect Fail - Invalid price range', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: LIST_PRODUCT,
        variables: {
          filter: {
            priceRange: {
              from: 1000,
              to: 500,
            },
          },
          limit: 3,
        },
      });
    const { errors } = res.body;
    assert(errors);
  });
});
