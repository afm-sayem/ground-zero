const Queue = require('bull');
const url = require('url');

exports.createQueue = function (name) {
  let redisConfig;
  let options = {};
  try {
    redisConfig = url.parse(process.env.REDIS_URL);
    if (redisConfig.auth) {
      options.password = redisConfig.auth.split(':')[1];
    }
    return Queue(name, redisConfig.port, redisConfig.hostname, redisConfig.options);
  } catch (e) {
    throw new Error('Malformed redis url');
  }
};

exports.mailQueue = exports.createQueue('mail');
