const requireGraphQLFile = require('require-graphql-file');
const assert = require('assert');
const request = require('supertest');
const _ = require('lodash');
const app = require('../../../app/app');
const Product = require('../../../app/datasources/mongodb/models/Product');

const { seedProducts } = require('../../helpers');

const VIEW_PRODUCT = requireGraphQLFile('./product.graphql');

describe('Testing: View Product - ', () => {
  beforeEach(async () => {
    await seedProducts();
  });

  it('Expect Success', async () => {
    const product = await Product.findOne({}).select('_id').lean();
    const res = await request(app)
      .post('/graphql')
      .send({
        query: VIEW_PRODUCT,
        variables: {
          id: product._id,
        },
      });

    logger.info('DEBUG =>', { product: res.body });
    const productResponse = res.body.data.product;
    assert.equal(productResponse.id, product._id);
  });

  it('Expect Fail - Product not found', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: VIEW_PRODUCT,
        variables: {
          id: 'not_exist',
        },
      });

    const { errors } = res.body;
    assert(errors.length);
  });

  it('Expect Fail - Product not found', async () => {
    const res = await request(app)
      .post('/graphql')
      .send({
        query: VIEW_PRODUCT,
        variables: {
          id: '5f152e77d43d58dd24723a9f',
        },
      });

    const { errors } = res.body;
    assert(errors.length);
  });
});
