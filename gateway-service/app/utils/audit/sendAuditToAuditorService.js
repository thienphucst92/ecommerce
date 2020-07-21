const axios = require('axios');
const config = require('../../config');

async function sendAuditToAuditorService(body) {
  try {
    const url = `${config.auditorService}/api/audit`;
    logger.info('sendToAud =>', { url });
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
    logger.error('sendAuditToAuditorService Error', { error });
    return null;
  }
}

module.exports = { sendAuditToAuditorService };
