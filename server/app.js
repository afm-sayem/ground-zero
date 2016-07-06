process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
if (process.env.NODE_ENV === 'production') {
  process.env.NEW_RELIC_HOME = path.resolve(__dirname(), '/config/newrilc.js');
  require('newrelic');
}

const morgan = require('morgan');
const compress = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const knexConfig = require('./knexfile');
const registerApi = require('./routes');
const Model = require('objection').Model;

const knex = require('knex')(knexConfig[process.env.NODE_ENV]);
Model.knex(knex);

const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(compress())
  .set('json spaces', 2);

// Ideally the API server should not be serving static content
// Use something like fastly/cloudfront
if (app.get('env') === 'production') {
  app.use(serveStatic(__dirname + '/public'));
  app.set('appPath', path.join(__dirname, '/public'));
} else {
  app.use(serveStatic(__dirname + '/../client'));
  app.set('appPath', path.join(__dirname, '/../client'));
}

registerApi(app);

const server = app.listen(process.env.PORT || 3000, function() {
  console.log('Example app listening at port %s', server.address().port);
});
