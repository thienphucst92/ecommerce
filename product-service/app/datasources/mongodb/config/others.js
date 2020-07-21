const ms = require('ms');

module.exports = {
  morgan_log_format: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :response-time[0] ms - :res[content-length] ":user-agent"',
};
