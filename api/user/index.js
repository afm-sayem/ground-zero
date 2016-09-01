const express = require('express');
const controller = require('./user.controller');
const processQuery = require('../../components/middlewares/process-query');
const ensureAuthenticated = require('../../components/middlewares/authenticate');

const router = new express.Router();

router.use(ensureAuthenticated);

router.get('/me', controller.show);
router.get('/', processQuery, controller.index);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/unlink', controller.unlink);

module.exports = router;
