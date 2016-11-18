const express = require('express');
const processQuery = require('../../components/middlewares/process-query');
const authenticate = require('../../components/middlewares/authenticate');
const BaseController = require('../base/base.controller');
const Movie = require('./movie.model');
const Review = require('../review/review.model');

const data = {
  additionalProperties: [{
    model: Movie,
    prop: 'movie_id',
    include: true,
    checkExistence: true,
  }],
  userField: 'user_id',
};


const controller = new BaseController(Review, 'review_id', data);
const router = new express.Router({ mergeParams: true });

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:review_id', controller.show.bind(controller));

router.use(authenticate);
router.post('/', controller.create.bind(controller));
router.put('/:review_id', controller.update.bind(controller));
router.patch('/:review_id', controller.update.bind(controller));
router.delete('/:review_id', controller.destroy.bind(controller));

module.exports = router;
