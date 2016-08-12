const express = require('express');
const processQuery = require('../../components/utilities').processQuery;
const Movie = require('./movie.model');
const Artist = require('../person/person.model');
const Review = require('../review/review.model');
const BaseController = require('../core/base.controller');
const ArtistController = require('./movie_artist.controller');
const ReviewController = require('./movie_review.controller');

const eager = '[type, director, artists, reviews]';
const controller = new BaseController(Movie, eager);
const artistController = new ArtistController(Artist);
const reviewController = new ReviewController(Review);

const router = new express.Router();
const artistRouter = new express.Router({mergeParams: true});
const reviewRouter = new express.Router({mergeParams: true});

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

artistRouter.get('/', processQuery, artistController.index.bind(artistController));
artistRouter.get('/:artist_id', artistController.show.bind(artistController));
artistRouter.post('/', artistController.create.bind(artistController));
artistRouter.put('/:artist_id', artistController.update.bind(artistController));
artistRouter.patch('/:artist_id', artistController.update.bind(artistController));
artistRouter.delete('/:artist_id', artistController.destroy.bind(artistController));

reviewRouter.get('/', processQuery, reviewController.index.bind(reviewController));
reviewRouter.get('/:review_id', reviewController.show.bind(reviewController));
reviewRouter.post('/', reviewController.create.bind(reviewController));
reviewRouter.put('/:review_id', reviewController.update.bind(reviewController));
reviewRouter.patch('/:review_id', reviewController.update.bind(reviewController));
reviewRouter.delete('/:review_id', reviewController.destroy.bind(reviewController));

router.use('/:id/artists', artistRouter);
router.use('/:id/reviews', reviewRouter);

module.exports = router;
