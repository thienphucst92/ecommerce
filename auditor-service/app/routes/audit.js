const AuditController = require('../controllers/audit');

module.exports = (app) => {
  app.post('/api/audit/', AuditController.createAudit);
};
