'use strict';
const Movie = require('./movie.model');

exports.create = function (req, res) {
  Movie.query()
    .insert(req.body)
    .then(movie => res.send(movie));
};

exports.update = function (req, res) {
  Movie.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(movie => res.send(movie));
};

exports.index = function (req, res) {
  Movie.query()
    .where('directorId', req.query.director)
    .andWhere('typeId', req.query.type)
    .andWhere('title', 'like', req.query.title)
    .then(movies => res.send(movies));
};

exports.show = function (req, res) {
  Movie.query()
    .findById(req.params.id)
    .then(movie => res.send(movie))
};

exports.destroy = function (req, res) {
  Movie.query()
    .deleteById(req.params.id)
    .then((movie) => res.send(movie))
};

