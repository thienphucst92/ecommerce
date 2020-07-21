module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  hostName: process.env.HOSTNAME || 'gateway',
  port: parseInt(process.env.PORT || '6776', 10),
};
