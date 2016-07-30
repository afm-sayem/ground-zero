require('dotenv').config();
const jsf = require('json-schema-faker');
const _ = require('lodash');

const movieSchema = require('../api/movie/movie.schema.json');
const personSchema = require('../api/person/person.schema.json');
const typeSchema = require('../api/type/type.schema.json');
const userSchema = require('../api/user/user.schema.json');
const reviewSchema = require('../api/review/review.schema.json');


function getRecords(count, schema) {
  return _.times(count, jsf.bind(void 0, schema));
}

// TODO: Prompt user before clearing out schemas
// Delete ManyToMany and OneToMany tables automatically
function truncate(knex, Promise, tables) {
  return Promise.each(tables,
      (table) => knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`));
}

const tables = ['movie', 'person', 'type', '"user"', 'review'];

exports.seed = function (knex, Promise) {
  const numberOfRecords = 10;
  return truncate(knex, Promise, tables)
    .then(() => Promise.all([
      knex('person').insert(getRecords(numberOfRecords, personSchema)),
      knex('type').insert(getRecords(numberOfRecords, typeSchema)),
    ]))
    .then(() => Promise.all([
      knex('movie').insert(getRecords(numberOfRecords, movieSchema)),
      knex('user').insert(getRecords(numberOfRecords, userSchema)),
    ]))
    .then(() => Promise.all([
      knex('review').insert(getRecords(numberOfRecords, reviewSchema)),
    ]));
};

