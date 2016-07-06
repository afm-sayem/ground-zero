const Promise = require('bluebird');
const redis = require('redis');
const url = require('url');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const config = require('../config/environment');

const redisConfig = url.parse(config.redisUrl);
const client = redis.createClient(redisConfig.port, redisConfig.hostname);

if (redisConfig.auth !== null) {
  client.auth(redisConfig.auth.split(':')[1]);
}

client.on('error', (e) => e);

module.exports = client;
