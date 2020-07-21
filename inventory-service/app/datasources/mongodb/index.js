const mongoose = require('mongoose');
const config = require('./config');

require('./models');
const controllers = require('./controllers');

if (process.env.NODE_ENV !== 'test') {
  const connectWithRetry = () => mongoose.connect(config.database, config.mongoOptions, (err) => {
    if (err) {
      logger.info('Failed to connect to mongo on startup - retrying in 5 sec', err);
      setTimeout(connectWithRetry, 5000);
    }
  });
  connectWithRetry();
}

module.exports = {
  ...controllers,
};
