const container = require('./container');
const db = require('./db');
const others = require('./others');

const config = {
  ...container,
  ...db,
  ...others,
};

module.exports = config;
