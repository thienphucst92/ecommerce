/* eslint global-require:off, import/no-dynamic-require:off */

const fs = require('fs');

const modelsPath = __dirname;
fs.readdirSync(modelsPath).forEach((file) => {
  if (file !== 'index.js') {
    const filePath = `./${file}`;
    require(filePath);
  }
});

module.exports = {};
