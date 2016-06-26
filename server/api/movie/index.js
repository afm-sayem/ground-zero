const express = require('express');
const controller = require('./movie.controller');
const processQuery = require('../../components/utilities').processQuery;

const router = express.Router();

router.get('/', processQuery, controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
