const findQuery = require('objection-find');
const Movie = require('./movie.model');
const utilities = require('../../components/utilities');

function create(req, res) {
  return Movie.query()
    .insert(req.body)
    .then(movie => utilities.responseHandler(null, res, 201, movie))
    .catch(err => utilities.responseHandler(err, res));
}

async function addArtist(req, res) {
  try {
    const movie = await Movie.query()
    .findById(req.params.id);
    if (!movie) return utilities.throwNotFonud(res);
    await movie
      .$relatedQuery('artists')
      .relate(req.body);
    return utilities.responseHandler(null, res, 201);
  } catch (err) {
    return utilities.responseHandler(err, res);
  }
}

async function addReview(req, res) {
  try {
    const movie = await Movie.query()
      .findById(req.params.id);
    if (!movie) return utilities.throwNotFonud(res);

    await movie.$relatedQuery('reviews')
      .insert(req.body);
    return utilities.responseHandler(null, res, 201);
  } catch (err) {
    return utilities.responseHandler(err, res);
  }
}

function update(req, res) {
  return Movie.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(movie => utilities.responseHandler(null, res, 200, movie))
    .catch(err => utilities.responseHandler(err, res));
}

function index(req, res) {
  return findQuery(Movie)
    .allowEager('[type, director, artists, reviews]')
    .registerFilter('search', utilities.searchFilter)
    .build(req.query.where)
    .eager(req.query.include)
    .orderBy(req.query.sort.by, req.query.sort.order)
    .page(req.query.page.number, req.query.page.size)
    .then(movies => utilities.responseHandler(null, res, 200, movies))
    .catch(err => utilities.responseHandler(err, res));
}

function show(req, res) {
  return Movie.query()
    .findById(req.params.id)
    .allowEager('[type, director, artists, reviews]')
    .eager(req.query.eager)
    .then(movie => {
      if (!movie) return utilities.throwNotFonud(res);
      return utilities.responseHandler(null, res, 200, movie);
    })
    .catch(err => utilities.responseHandler(err, res));
}

function destroy(req, res) {
  return Movie.query()
    .deleteById(req.params.id)
    .then(() => utilities.responseHandler(null, res, 204))
    .catch(err => utilities.responseHandler(err, res));
}

module.exports = { create, update, addArtist, index, show, destroy, addReview };
