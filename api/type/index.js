const express = require('express');
const Type = require('./type.model');
const BaseController = require('../base/base.controller');
const processQuery = require('../../components/middlewares/process-query');
const authenticate = require('../../components/middlewares/authenticate');

const controller = new BaseController(Type, 'type_id');

const router = new express.Router();

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:type_id', controller.show.bind(controller));

router.use(authenticate);
router.post('/', controller.create.bind(controller));
router.put('/:type_id', controller.update.bind(controller));
router.patch('/:type_id', controller.update.bind(controller));
router.delete('/:type_id', controller.destroy.bind(controller));

module.exports = router;
