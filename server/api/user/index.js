'use strict';

const express = require('express');
const controller = require('./user.controller');
const authUtils = require('../../auth/authutils');
const processQuery = require('../../components/utilities').processQuery;

const router = express.Router();

// router.use(authUtils.ensureAuthenticated); 

router.get('/me', controller.show);
router.get('/', processQuery, controller.index);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/unlink', controller.unlink);

module.exports = router;
