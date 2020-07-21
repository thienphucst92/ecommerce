const graphqlFields = require('graphql-fields');
const { ApolloError } = require('apollo-server-express');
const _ = require('lodash');
const Product = require('../../models/Product');
const { buildProductQuery } = require('../../utils/controllers/productUtils');

async function getProductById({ context, info }, { id }) {
  try {
    const selectedFields = _.filter(_.keys(graphqlFields(info)), item => item !== 'id').join(' ');
    const product = await Product.findById(id).select(`${selectedFields || '-__v'}`).lean();

    if (!product) {
      throw new ApolloError(`Cannot find product with id ${id}`);
    }

    context.audit = { ...context.audit, isSucess: true };
    return { ...product, id: product._id };
  } catch (error) {
    context.audit = { ...context.audit, isSuccess: false, reason: error.message };
    throw new ApolloError(error);
  }
}

async function getProducts({ context, info }, { filter = { }, limit = 10 }) {
  try {
    const selectedFields = _.filter(_.keys(graphqlFields(info)), item => item !== 'id').join(' ');

    const { productQuery, sortCriteria } = buildProductQuery(filter);
    logger.info('getProducts =>', { productQuery, sortCriteria });
    const products = await Product.find(productQuery)
      .select(`${selectedFields || '-__v'}`)
      .sort(sortCriteria)
      .limit(limit)
      .lean();

    context.audit = { ...context.audit, isSucess: true };
    return _.map(products, x => ({ ...x, id: x._id }));
  } catch (error) {
    context.audit = { ...context.audit, isSuccess: false, reason: error.message };
    throw new ApolloError(error);
  }
}

module.exports = {
  getProductById,
  getProducts,
};
