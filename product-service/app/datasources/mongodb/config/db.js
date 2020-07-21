const ms = require('ms');

module.exports = {
  // mongodb
  database_test: 'mongodb://localhost/product-db',
  database: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/product-db',
  mongoOptions: {
    autoReconnect: true,
    connectTimeoutMS: 30000,
    keepAlive: 1000,
    useNewUrlParser: true,
  },
};
