const auth = require('basic-auth');
const zeroPad = require('../others/zeroPad');

function pad2(num) {
  return zeroPad(num, 2);
}

function clfDate(dateTime) {
  const CLF_MONTH = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];

  const date = dateTime.getUTCDate();
  const hour = dateTime.getUTCHours();
  const mins = dateTime.getUTCMinutes();
  const secs = dateTime.getUTCSeconds();
  const year = dateTime.getUTCFullYear();

  const month = CLF_MONTH[dateTime.getUTCMonth()];

  return `${pad2(date)}/${month}/${year}:${pad2(hour)}:${pad2(mins)}:${pad2(secs)} +0000`;
}

function getResponseTime(req, res, digits) {
  if (!req._startAt || !res._startAt) {
    // missing request and/or response start time
    return undefined;
  }

  // calculate diff
  const ms = (res._startAt[0] - req._startAt[0]) * 1e3
    + (res._startAt[1] - req._startAt[1]) * 1e-6;

  // return truncated value
  return ms.toFixed(digits === undefined ? 3 : digits);
}

function buildAccessLog(req, res) {
  const ip = req.ip
  || req._remoteAddress
  || (req.connection && req.connection.remoteAddress)
  || undefined;

  const credentials = auth(req);
  const remoteUser = credentials
    ? credentials.name
    : '-';

  const date = clfDate(new Date());
  const url = req.originalUrl || req.url;
  const httpVersion = `${req.httpVersionMajor}.${req.httpVersionMinor}`;
  const responseTime = getResponseTime(req, res);
  const contentLength = res.getHeader('Content-Length');
  const userAgent = req.headers['user-agent'];

  return `${ip} - ${remoteUser} [${date}] "${req.method} ${url} HTTP/${httpVersion}" ${res.statusCode} ${responseTime} ms - ${contentLength} "${userAgent}"`;
}

module.exports = { buildAccessLog };
