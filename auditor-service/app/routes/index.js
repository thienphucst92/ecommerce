const HealthCheck = require('./healthcheck');
const auditController = require('./audit');
const errorHandler = require('./middleware/errorHandler');

module.exports = (app) => {
  HealthCheck(app);

  auditController(app);

  errorHandler(app);
};
