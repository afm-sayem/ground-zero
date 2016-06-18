'use strict';

const User = require('./user.model');

exports.update = function (req, res) {
  User.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(user => res.send(user));
};

exports.index = function (req, res) {
  User.query()
    .where('name', 'like', req.query.name)
    .then(users => res.send(users));
};

exports.show = function (req, res) {
  console.log(req.user);
  User.query()
    .findById(req.user)
    .then(user => res.send(user))
};

exports.destroy = function (req, res) {
  User.query()
    .delete()
    .where('id', req.params.id)
    .then(() => res.send({}))
};

exports.unlink = function(req,res) {
  let provider = req.query.provider;

  let providers = ['facebook'];

  if (providers.indexOf(provider) === -1) {
    return res.status(400).send('Unknown provider');
  }

  User.query()
    .findById(req.user)
    .update({[provider]: null})
    .then((user) => {
      res.send(user);
    })
};
