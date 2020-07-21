const db = require('./db');
const others = require('./others');

const config = {
  ...db,
  ...others,
};

module.exports = config;
