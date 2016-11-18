const express = require('express');
const processQuery = require('../../components/middlewares/process-query');
const authenticate = require('../../components/middlewares/authenticate');
const Movie = require('./movie.model');
const BaseController = require('../base/base.controller');
const artistRouter = require('./movie_person');
const reviewRouter = require('./movie_review');

const controller = new BaseController(Movie, 'movie_id');

const router = new express.Router();

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:movie_id', controller.show.bind(controller));

router.use('/:movie_id/artists', artistRouter);
router.use('/:movie_id/reviews', reviewRouter);

router.use(authenticate);
router.post('/', controller.create.bind(controller));
router.put('/:movie_id', controller.update.bind(controller));
router.patch('/:movie_id', controller.update.bind(controller));
router.delete('/:movie_id', controller.destroy.bind(controller));

module.exports = router;
