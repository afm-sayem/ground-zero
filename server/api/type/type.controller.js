'use strict';

const Type = require('./type.model');

exports.create = function (req, res) {
  Type.query()
    .insert(req.body)
    .then(type => res.send(type));
};

exports.update = function (req, res) {
  Type.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(type => res.send(type));
};

exports.index = function (req, res) {
  Type.query()
    .where('name', 'like', req.query.name)
    .then(types => res.send(types));
};

exports.show = function (req, res) {
  Type.query()
    .where('id', req.params.id)
    .then(type => res.send(type))
};

exports.destroy = function (req, res) {
  Type.query()
    .delete()
    .where('id', req.params.id)
    .then(() => res.send({}))
};
