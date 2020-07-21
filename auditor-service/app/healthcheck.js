const http = require('http');
const config = require('./config');
const logger = require('./utils/logger');

const options = {
  timeout: 2000,
  host: 'localhost',
  port: config.port,
  path: '/api/healthcheck/',
};

const request = http.request(options, (res) => {
  logger.info(`HEALTHCHECK Status:${res.statusCode}`);
  process.exitCode = (res.statusCode === 200) ? 0 : 1;
  process.exit();
});

request.on('error', (err) => {
  logger.info('HEALTHCHECK Error', err);
  process.exit(1);
});

request.end();
