module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  hostName: process.env.HOSTNAME || 'product-service',
  port: parseInt(process.env.PORT || '6777', 10),
};
