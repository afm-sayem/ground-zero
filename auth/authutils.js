'use strict';
const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config/environment');

exports.createJWT = function (user) {
  let payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };

  return jwt.encode(payload, config.token);
};

exports.ensureAuthenticated = function (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send({message: 'No authorization header is present'});
  }
  let payload = null;

  try {
    let token = req.headers.authorization.split(' ')[1];
    payload = jwt.decode(token, config.token);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  // if token has expired
  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  req.user = payload.sub;
  next();
};
