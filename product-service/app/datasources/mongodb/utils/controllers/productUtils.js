function buildProductQuery(filter) {
  const { name, priceRange, branch, sortBy = 'price', sortDirection = 'asc', cursor } = filter || {};

  if (!['name', 'price'].includes(sortBy)) {
    throw new Error('Invalid sortBy value');
  }

  if (!['asc', 'desc'].includes(sortDirection)) {
    throw new Error('Invalid sortDirection value');
  }

  if (priceRange) {
    const { from, to } = priceRange;
    if (from > to) {
      throw new Error('Invalid priceRange value');
    }
  }

  const productQuery = {};
  if (name) {
    productQuery.name = name;
  }
  if (branch) {
    productQuery.branch = branch;
  }
  if (priceRange) {
    const { from, to } = priceRange;
    productQuery.price = {
      $gte: from,
      $lte: to,
    };
  }
  if (cursor) {
    if (sortDirection === 'asc') {
      productQuery.price = {
        $gt: cursor,
      };
    } else {
      productQuery.price = {
        $lt: cursor,
      };
    }
  }
  const sortCriteria = {};
  sortCriteria[`${sortBy}`] = sortDirection;

  return {
    productQuery, sortCriteria,
  };
}

module.exports = {
  buildProductQuery,
};
