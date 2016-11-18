const express = require('express');
const processQuery = require('../../components/middlewares/process-query');
const ensureAuthenticated = require('../../components/middlewares/authenticate');
const UserController = require('./user.controller');

const router = new express.Router();
const controller = new UserController();

router.use(ensureAuthenticated);

router.get('/me', controller.show.bind(controller));
router.get('/', processQuery, controller.index.bind(controller));
router.put('/:user_id', controller.update.bind(controller));
router.patch('/:user_id', controller.update.bind(controller));
router.delete('/:user_id', controller.destroy.bind(controller));
router.post('/unlink', controller.unlink.bind(controller));

module.exports = router;
