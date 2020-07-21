const auditCommand = require('./auditCommand');
const auditQuery = require('./auditQuery');

module.exports = {
  ...auditCommand,
  ...auditQuery,
};
