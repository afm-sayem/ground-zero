'use strict';
const knexconfig = require('./knexfile.js');
const knex = require('knex')(knexconfig[process.env.NODE_ENV]);

knex.migrate.latest({}).finally(function () {
  console.log('done');
  knex.destroy();
});
