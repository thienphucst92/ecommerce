const buildAccessLog = require('./buildAccessLog');
const sendAuditToAuditorService = require('./sendAuditToAuditorService');

module.exports = {
  ...buildAccessLog,
  ...sendAuditToAuditorService,
};
