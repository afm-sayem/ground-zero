'use strict';

const request = require('request-promise');
const jwt = require('jwt-simple');

const User = require('../api/user/user.model');
const config = require('../config/environment');
const authUtils = require('./authutils');

exports.authenticate = function (req, res) {
  let params = {
    code: req.body.code,
    client_id: req.body.clientId,
    client_secret: config.facebook.secret,
    redirect_uri: req.body.redirectUri
  };

  request.get({ url: config.facebook.oauthUrl, qs: params, json: true}, function (err, response, token) {
    if (response.statusCode !== 200) {
      return res.status(500).send({message: token.error.message});
    }

    request.get({ url: config.facebook.graphUrl, qs: token, json: true }, (err, response, profile) => {
      User.query()
        .where('facebook', profile.id)
        .then((user) => {
          if (req.headers.authorization) {
            if (user.length !== 0) {
              res.status(409).send({message: 'There is already a facebook account that belongs to you'});
            }

            let secretToken = req.headers.authorization.split(' ')[1];
            let payload = jwt.decode(secretToken, config.token);

            User.query()
              .findById(payload.sub)
              .then((user) => {
                if (!user) {
                  return res.status(404).send({message: 'User not found'});
                }
                createUser(res, profile.name, profile.id, 1);
              });
          } else {
            if (user.length !== 0) {
              return res.status(201).send({token: authUtils.createJWT(user)});
            }
            createUser(res, profile.name, profile.id, 1);
          }
        });
    });
  });
};

function createUser(responseObj, name, facebook, role) {
  User.query()
    .insert({
      name: name,
      facebook: facebook,
      role: role
    })
  .then((user) => {
    return responseObj.send({token: authUtils.createJWT(user)});
  })
  .catch((error) => {
    return error;
  });
}
