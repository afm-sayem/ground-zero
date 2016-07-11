const Promise = require('bluebird');
const redis = require('redis');
Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

const client = redis.createClient(process.env.REDIS_URL);
client.on('error', (e) => e);

module.exports = client;
