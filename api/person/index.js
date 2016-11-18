const express = require('express');
const Person = require('./person.model');
const BaseController = require('../base/base.controller');
const processQuery = require('../../components/middlewares/process-query');
const authenticate = require('../../components/middlewares/authenticate');

const controller = new BaseController(Person, 'person_id');

const router = new express.Router();

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:person_id', controller.show.bind(controller));

router.use(authenticate);
router.post('/', controller.create.bind(controller));
router.put('/:person_id', controller.update.bind(controller));
router.patch('/:person_id', controller.update.bind(controller));
router.delete('/:person_id', controller.destroy.bind(controller));

module.exports = router;
