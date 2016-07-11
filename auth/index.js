'use strict';

const express = require('express');
const facebook = require('./facebook');
const local = require('./auth.controller');

const router = express.Router();

router.post('/facebook', facebook.authenticate);

router.post('/signup', local.signup);
router.get('/verify', local.verify);
router.post('/login', local.login);
router.post('/request-reset', local.requestReset);
router.post('/reset', local.reset);

module.exports = router;
