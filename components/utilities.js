const _ = require('lodash');
const mailQueue = require('../config/queue').mailQueue;

function getErrorStatus(err) {
  let errStatus = 500;
  if (err.name === 'error') {
    errStatus = 400;
  }
  return errStatus;
}

function responseHandler(err, res, status, data) {
  // TODO: send response based on the error message
  if (err) {
    const errStatus = getErrorStatus(err);
    return res.status(err.statusCode || errStatus || 500)
      .send(_.pickBy({ err: `${err.message}`, hint: `${err.hint || ''}` }));
  }
  return res.status(status || 200).send(data);
}

function throwNotFound(res) {
  const error = new Error('Not found');
  error.statusCode = 404;
  return responseHandler(error, res);
}

function sendMail(to, from, subject, content) {
  return mailQueue.add({ from, to, subject, html: content });
}

module.exports = { responseHandler, sendMail, throwNotFound };
