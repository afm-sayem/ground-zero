const url = require('url');

const redisUrl = url.parse(process.env.REDISTOGO_URL);
module.exports = {
  redis: {
    host: redisUrl.hostname,
    port: redisUrl.port,
    password: redisUrl.auth && redisUrl.auth.split(':')[1],
  },
};
