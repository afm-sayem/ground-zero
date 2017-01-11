const request = require('request-promise');
const User = require('../api/user/user.model');
const config = require('../config/environment');
const authUtils = require('./authutils');

function createUser(responseObj, name, facebook) {
  return User.query()
    .insert({ name, facebook })
    .then((user) => responseObj.send({ token: authUtils.createJWT(user) }))
    .catch(error => error);
}

exports.authenticate = function (req, res) {
  return request.get({
    url: config.facebook.profile,
    qs: req.body,
    json: true,
  }, (fberr, fbres, profile) => {
    if (fberr) {
      res.status(400).send({
        message: fberr,
      });
    }

    User.query()
      .where('facebook', profile.id)
      .then((user) => {
        if (user.length) {
          return res.status(200).send({ token: authUtils.createJWT(user[0]) });
        }
        return createUser(res, profile.name, profile.id);
      });
  });
};

