const command = require('./command');
const query = require('./query');

module.exports = {
  ...command,
  ...query,
};
