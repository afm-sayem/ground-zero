const url = require('url');

const redisUrl = url.parse(process.env.REDIS_URL);

module.exports = {
  redis: {
    host: redisUrl.hostname,
    port: redisUrl.port,
  },
};
