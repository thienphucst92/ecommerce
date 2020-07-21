const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

require('./global');
require('./models');
const config = require('./config');

const routes = require('./routes');

// express
const app = express();
app.use(cors());

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect(config.database, config.mongoOptions, (err) => {
    if (err) {
      logger.info(`connection failed ${err}`);
    } else {
      logger.info('hello from mongodb');
    }
  });
} else {
  app.use(morgan('dev'));
}

app.set('supperSecret', config.secret);
app.use(bodyParser.json());

// mongoose
mongoose.Promise = global.Promise;

app.enable('trust proxy');
routes(app);

module.exports = app;
