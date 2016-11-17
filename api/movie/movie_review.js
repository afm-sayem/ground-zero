const express = require('express');
const processQuery = require('../../components/middlewares/process-query');
const BaseController = require('../base/base.controller');
const Movie = require('./movie.model');
const Review = require('../review/review.model');

const additionaleProperties = [{
  model: Movie,
  prop: 'movie_id',
  include: true,
  checkExistence: true,
}];

const controller = new BaseController(Review, 'review_id', additionaleProperties);
const router = new express.Router({ mergeParams: true });

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:review_id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:review_id', controller.update.bind(controller));
router.patch('/:review_id', controller.update.bind(controller));
router.delete('/:review_id', controller.destroy.bind(controller));

module.exports = router;
