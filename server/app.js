'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'production') {
  require('newrelic');
}

const _ = require('lodash');
const Knex = require('knex');
const path = require('path');
const morgan = require('morgan');
const compress = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const knexConfig = require('./knexfile');
const registerApi = require('./routes');
const Model = require('objection').Model;

const knex = Knex(knexConfig[process.env.NODE_ENV]);
Model.knex(knex);

const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(compress())
  .set('json spaces', 2);

if (app.get('env') === 'production') {
  app.use(serveStatic(__dirname + '/public'));
  app.set('appPath', path.join(__dirname, '/public'));
} else {
  app.use(serveStatic(__dirname + '/../client'));
  app.set('appPath', path.join(__dirname, '/../client'));
}

registerApi(app);

const server = app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at port %s', server.address().port);
});
