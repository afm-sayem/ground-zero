const express = require('express');
const processQuery = require('../../components/middlewares/process-query');
const authenticate = require('../../components/middlewares/authenticate');
const BaseController = require('../base/base.controller');
const Movie = require('./movie.model');
const MoviePerson = require('./movie_person.model');

const data = {
  additionalProperties: [{
    model: Movie,
    prop: 'movie_id',
    include: true,
    checkExistence: true,
  }],
  filterEager: [{
    table: 'person',
    property: 'name',
  }],
};

const controller = new BaseController(MoviePerson, 'artist_id', data);
const router = new express.Router({ mergeParams: true });

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:artist_id', controller.show.bind(controller));

router.use(authenticate);
router.post('/', controller.create.bind(controller));
router.put('/:artist_id', controller.update.bind(controller));
router.patch('/:artist_id', controller.update.bind(controller));
router.delete('/:artist_id', controller.destroy.bind(controller));

module.exports = router;
