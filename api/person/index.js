const express = require('express');
const Person = require('./person.model');
const BaseController = require('../core/base.controller');
const processQuery = require('../../components/middlewares/process-query');

const controller = new BaseController(Person);

const router = new express.Router();

router.get('/', processQuery, controller.index.bind(controller));
router.get('/:id', controller.show.bind(controller));
router.post('/', controller.create.bind(controller));
router.put('/:id', controller.update.bind(controller));
router.patch('/:id', controller.update.bind(controller));
router.delete('/:id', controller.destroy.bind(controller));

module.exports = router;
