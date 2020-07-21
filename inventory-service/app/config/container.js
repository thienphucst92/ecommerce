module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  hostName: process.env.HOSTNAME || 'inventory-service',
  port: parseInt(process.env.PORT || '6778', 10),
};
