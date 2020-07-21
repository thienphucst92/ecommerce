const ms = require('ms');

module.exports = {
  // mongodb
  database_test: 'mongodb://localhost/inventory-db',
  database: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/inventory-db',
  mongoOptions: {
    autoReconnect: true,
    connectTimeoutMS: 30000,
    keepAlive: 1000,
    useNewUrlParser: true,
  },
};
