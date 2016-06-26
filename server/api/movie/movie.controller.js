const Movie = require('./movie.model');
const MovieSerializer = require('./movie.serializer');
const responseHandler = require('../../components/utilities').responseHandler.bind(MovieSerializer);
const isEmpty = require('lodash').isEmpty;
const findQuery = require('objection-find');

// allowed query parameters: include, page*, limit, filter, order and fields
// https://github.com/TryGhost/Ghost/issues/5463

exports.create = function (req, res) {
  Movie.query()
    .insert(req.body)
    .then(movie => responseHandler(res, movie))
    .catch(err => responseHandler(res, null, err));
};

exports.update = function (req, res) {
  Movie.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(movie => responseHandler(res, movie))
    .catch(err => responseHandler(res, null, err));
};

exports.index = function (req, res) {
  findQuery(Movie)
    .allowEager('[type, director]')
    .build(req.query.filter)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(movies => responseHandler(res, movies.results, null, {total: movies.total}))
    .catch(err => responseHandler(res, null, err));
};

exports.show = function (req, res) {
  Movie.query()
    .findById(req.params.id)
    .allowEager('[type, director]')
    .eager(req.query.eager)
    .then(movie => {
      if (isEmpty(movie)) {
        return res.status(404).send({message: 'Not Found'});
      }
      return responseHandler(res, movie);
    })
    .catch(err => responseHandler(res, null, err));
};

exports.destroy = function (req, res) {
  Movie.query()
    .deleteById(req.params.id)
    .then((movie) => responseHandler(res, movie))
    .catch(err => responseHandler(res, null, err));
};

