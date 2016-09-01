const moment = require('moment');
const jwt = require('jwt-simple');
const config = require('../config/environment');

exports.createJWT = function (user) {
  const payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix(),
  };

  return jwt.encode(payload, config.token);
};

