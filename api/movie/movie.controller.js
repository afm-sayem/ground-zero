const findQuery = require('objection-find');
const Movie = require('./movie.model');
const utilities = require('../../components/utilities');

function create(req, res) {
  return Movie.query()
    .insert(req.body)
    .then(movie => utilities.responseHandler(null, res, 201, movie))
    .catch(err => utilities.responseHandler(err, res, 500));
}

function addArtist(req, res) {
  return Movie.query()
    .findById(req.params.id)
    .then(movie => {
      if (!movie) return utilities.responseHandler(new Error('Not found'), res, 404, movie);
      return movie
        .$relatedQuery('artists')
        .relate(req.body)
        .then(artist => utilities.responseHandler(null, res, 200, artist))
        .catch(err => utilities.responseHandler(err, res));
    });
}

function update(req, res) {
  return Movie.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(movie => utilities.responseHandler(null, res, 200, movie))
    .catch(err => utilities.responseHandler(err, res));
}

function index(req, res) {
  return findQuery(Movie)
    .allowEager('[type, director, artists]')
    .registerFilter('search', utilities.searchFilter)
    .build(req.query.where)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(movies => utilities.responseHandler(null, res, 200, movies))
    .catch(err => utilities.responseHandler(err, res, 500));
}

function show(req, res) {
  return Movie.query()
    .findById(req.params.id)
    .allowEager('[type, director, artists]')
    .eager(req.query.eager)
    .then(movie => {
      if (!movie) return utilities.responseHandler(new Error('Not found'), res, 404);
      return utilities.responseHandler(null, res, 200, movie);
    })
    .catch(err => utilities.responseHandler(err, res, 400));
}

function destroy(req, res) {
  return Movie.query()
    .deleteById(req.params.id)
    .then(() => utilities.responseHandler(null, res, 204))
    .catch(err => utilities.responseHandler(err, res, 500));
}

module.exports = { create, update, addArtist, index, show, destroy };
