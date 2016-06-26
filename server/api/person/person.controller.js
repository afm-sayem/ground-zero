'use strict';

const Person = require('./person.model');

exports.create = function (req, res) {
  Person.query()
    .insert(req.body)
    .then(person => res.send(person));
};

exports.update = function (req, res) {
  Person.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(person => res.send(person));
};

exports.index = function (req, res) {
  Person.query()
    .where('name', 'like', req.query.name)
    .then(persons => res.send(persons));
};

exports.show = function (req, res) {
  Person.query()
    .where('id', req.params.id)
    .then(person => res.send(person));
};

exports.destroy = function (req, res) {
  Person.query()
    .delete()
    .where('id', req.params.id)
    .then(() => res.send({}));
};

