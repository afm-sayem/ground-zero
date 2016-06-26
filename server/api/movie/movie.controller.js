const Movie = require('./movie.model');
const MovieSerializer = require('./movie.serializer');
const responseHandler = require('../../components/utilities').responseHandler.bind(MovieSerializer);
const findQuery = require('objection-find');

// allowed query parameters: include, page*, limit, filter, order and fields
// https://github.com/TryGhost/Ghost/issues/5463

exports.create = function (req, res) {
  Movie.query()
    .insert(req.body)
    .then(movie => responseHandler(null, res, 201, movie))
    .catch(err => responseHandler(err, res));
};

exports.update = function (req, res) {
  Movie.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(movie => responseHandler(null, res, 200, movie))
    .catch(err => responseHandler(err, res));
};

exports.index = function (req, res) {
  findQuery(Movie)
    .allowEager('[type, director]')
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(movies => responseHandler(null, res, 200, movies.results, {total: movies.total}))
    .catch(err => responseHandler(err, res));
};

exports.show = function (req, res) {
  Movie.query()
    .findById(req.params.id)
    .allowEager('[type, director]')
    .eager(req.query.eager)
    .then(movie => responseHandler(null, res, 200, movie))
    .catch(err => responseHandler(err, res));
};

exports.destroy = function (req, res) {
  Movie.query()
    .deleteById(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => responseHandler(err, res));
};

