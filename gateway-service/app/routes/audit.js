const _ = require('lodash');
const onFinished = require('on-finished');

const { buildAccessLog, sendAuditToAuditorService } = require('../utils/audit');

function auditLog(app) {
  app.use(/^(?:^(?:(?!^(?:\/healthcheck)$).)+$)$/, (req, res, next) => {
    const log = () => {
      const audit = JSON.parse(res.getHeader('audit') || '{}');
      logger.info('auditLog =>', { audit });

      if (!audit.shouldSend) {
        next();
        return;
      }
      const { statusCode } = res;
      const accessLog = buildAccessLog(req, res);
      const auditInfo = {
        ...audit,
        statusCode,
        accessLog,
      };
      sendAuditToAuditorService(auditInfo);
    };

    onFinished(res, log);
    next();
  });
}

module.exports = {
  auditLog,
};
