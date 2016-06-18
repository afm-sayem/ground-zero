'use strict';

const express = require('express');
const controller = require('./user.controller');
const authUtils = require('../../auth/authutils');

const router = express.Router();

router.use(authUtils.ensureAuthenticated); 

router.get('/me', controller.show);
router.get('/', controller.index);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/unlink', controller.unlink);

module.exports = router;
