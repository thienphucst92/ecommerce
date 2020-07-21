/* eslint no-console:off */
const mongoose = require('mongoose');
const config = require('../app/config');

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
    const { audits } = mongoose.connection.collections;
    if (audits) {
      await audits.remove();
    }
  } catch (error) {
    console.error(error);
  }
});
