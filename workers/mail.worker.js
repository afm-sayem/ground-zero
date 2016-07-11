require('dotenv').config();
const mail = require('../config/mail');
const mailQueue = require('../config/queue').mailQueue;

mailQueue.process(async function (mailInfo, done){
  try {
    await mail.sendMail(mailInfo.data);
    return done();
  } catch (e) {
    throw e;
  }
});

// setInterval(mailQueue.clean.bind(60 * 1000), 50 * 1000);
setInterval(() => {
  mailQueue.clean(60 * 1000);
}, 50 * 1000);

process.once('SIGTERM', () => {
  mailQueue
    .close()
    .then(process.exit.bind(0))
    .catch(e => e);
});

