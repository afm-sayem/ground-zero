const utilities = require('../../components/utilities');
const findQuery = require('objection-find');
const BaseController = require('../core/base.controller');
const Movie = require('./movie.model');

class MovieArtistController extends BaseController {
  constructor(model, eager, id) {
    super(model, eager, id);
    this.model = model;
    this.eager = eager;
  }

  async create(req, res) {
    try {
      const movie = await Movie.query()
        .findById(req.params.id);
      if (!movie) return utilities.throwNotFound(res);
      await movie
        .$relatedQuery('artists')
        .relate(req.body);
      return utilities.responseHandler(null, res, 201);
    } catch (err) {
      return utilities.responseHandler(err, res);
    }
  }

  index(req, res) {
    findQuery(this.model)
      .build(req.query.filter)
      .join('person_movie', 'person.id', 'person_movie.person_id')
      .where('movie_id', req.params.id)
      .eager(req.query.include)
      .skipUndefined()
      .orderBy(req.query.sort.by, req.query.sort.request)
      .page(req.query.page.number, req.query.page.size)
      .then(requests => utilities.responseHandler(null, res, 200, requests))
      .catch(err => utilities.responseHandler(err, res));
  }
}

module.exports = MovieArtistController;
