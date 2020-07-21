module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  hostName: process.env.HOSTNAME || 'auditor-service',
  port: parseInt(process.env.PORT || '6775', 10),
};
