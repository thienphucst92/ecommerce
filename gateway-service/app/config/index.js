const container = require('./container');
const others = require('./others');
const services = require('./services');
const url = require('./url');

const config = {
  ...container,
  ...others,
  ...services,
  ...url,
};

module.exports = config;
