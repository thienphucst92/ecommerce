/* eslint no-console:off */
require('../app/global');
const mongoose = require('mongoose');
const _ = require('lodash');
const config = require('../app/datasources/mongodb/config');

before((done) => {
  mongoose.connect(config.database_test);
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});

beforeEach(async () => {
  try {
    const { collections } = mongoose.connection;
    let removePromises = [];

    removePromises = _.map(collections, collection => collection.remove());
    await Promise.all(removePromises);
  } catch (error) {
    console.error(error);
  }
});
