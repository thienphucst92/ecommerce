module.exports = {
  database_test: 'mongodb://localhost/auditor-db',
  database: process.env.DB_CONNECTION_STRING || 'mongodb://localhost/auditor-db',
  mongoOptions: {
    autoReconnect: true,
    connectTimeoutMS: 30000,
    keepAlive: 1000,
    useNewUrlParser: true,
  },
};
