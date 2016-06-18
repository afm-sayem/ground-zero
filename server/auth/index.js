'use strict';

const express = require('express');
const authUtils = require('./authutils');
const facebook = require('./facebook');

const router = express.Router();

router.post('/facebook', facebook.authenticate);

module.exports = router;
