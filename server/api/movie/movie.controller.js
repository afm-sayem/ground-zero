const Movie = require('./movie.model');
const MovieSerializer = require('./movie.serializer');
const isEmpty = require('lodash').isEmpty;

exports.create = function (req, res) {
  Movie.query()
    .insert(req.body)
    .then(movie => responseHandler(res, movie));
};

exports.update = function (req, res) {
  Movie.query()
    .patchAndFetchById(req.params.id, req.body)
    .then(movie => responseHandler(res, movie));
};

exports.index = function (req, res) {
  Movie.query()
    .allowEager('[type]')
    .eager(req.query.eager)
    .where('directorId', req.query.director)
    .andWhere('typeId', req.query.type)
    .andWhere('title', 'like', req.query.title)
    .then(movies => responseHandler(res, movies))
    .catch(err => responseHandler(res, null, err));
};

exports.show = function (req, res) {
  Movie.query()
    .findById(req.params.id)
    .allowEager('[type]')
    .eager(req.query.eager)
    .then(movie => {
      if (isEmpty(movie)) {
        return res.status(404).send({message: 'Not Found'});
      }
      return responseHandler(res, movie);
    });
};

exports.destroy = function (req, res) {
  Movie.query()
    .deleteById(req.params.id)
    .then((movie) => responseHandler(res, movie));
};

function responseHandler(response, object, error) {
  if (error) {
    return response.status(400).send({error: error});
  }
  let json;
  try {
    json = MovieSerializer.serialize(object);
  } catch (e) {
    return response.status(422).send({error: e});
  }
  return response.status(200).send(json);
}

