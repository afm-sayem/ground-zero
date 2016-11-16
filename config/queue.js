const Queue = require('bull');
const config = require('./environment');

function createQueue(name) {
  return new Queue(name, config.redis);
}

const mailQueue = createQueue('mail');

module.exports = { createQueue, mailQueue };
