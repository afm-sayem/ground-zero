const express = require('express');
const processQuery = require('../../components/middlewares/process-query');
const BaseController = require('../base/base.controller');
const Movie = require('./movie.model');
const MoviePerson = require('./movie_person.model');

const additionaleProperties = [{
  model: Movie,
  prop: 'movie_id',
  include: true,
  checkExistence: true,
}];

const controller = new BaseController(MoviePerson, 'artist_id', additionaleProperties);
const router = new express.Router({ mergeParams: true });

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:artist_id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:artist_id', controller.update.bind(controller));
router.patch('/:artist_id', controller.update.bind(controller));
router.delete('/:artist_id', controller.destroy.bind(controller));

module.exports = router;
