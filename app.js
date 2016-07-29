require('dotenv').config();
if (process.env.NODE_ENV === 'production') require('newrelic');

const morgan = require('morgan');
const compress = require('compression');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const knexConfig = require('./knexfile');
const registerApi = require('./routes');
const Model = require('objection').Model;
const knex = require('knex')(knexConfig[process.env.NODE_ENV]);

Model.knex(knex);

const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .use(compress())
  .use(cors())
  .set('json spaces', 2);

registerApi(app);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening at port %s', server.address().port);
});
