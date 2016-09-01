const jwt = require('jwt-simple');
const config = require('../../config/environment');
const moment = require('moment');

module.exports = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({ message: 'No authorization header is present' });
  }
  let payload = null;

  try {
    const token = req.headers.authorization.split(' ')[1];
    payload = jwt.decode(token, config.token);
  } catch (err) {
    return res.status(401).send({ message: err.message });
  }

  // if token has expired
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  return next();
};
