const Queue = require('bull');
const config = require('./environment');

exports.createQueue = function (name) {
  return new Queue(name, config.redis.port, config.redis.host, { password: config.redis.password });
};

exports.mailQueue = exports.createQueue('mail');
