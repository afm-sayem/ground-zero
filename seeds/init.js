require('dotenv').config();
const jsf = require('json-schema-faker');
const _ = require('lodash');

const movieSchema = require('../api/movie/movie.schema.json');
const personSchema = require('../api/person/person.schema.json');
const typeSchema = require('../api/type/type.schema.json');
const userSchema = require('../api/user/user.schema.json');


function getRecords(count, schema) {
  return _.times(count, jsf.bind(void 0, schema));
}

// TODO: Prompt user before clearing out schemas
// Delete ManyToMany and OneToMany tables automatically
function truncate(knex, Promise, tables) {
  return Promise.each(tables,
      (table) => knex.raw(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE`));
}

const tables = ['"Movie"', '"Person"', '"Type"', '"User"'];


exports.seed = function (knex, Promise) {
  const numberOfRecords = 10;
  return truncate(knex, Promise, tables)
    .then(() => Promise.all([
      knex('Person').insert(getRecords(numberOfRecords, personSchema)),
      knex('Type').insert(getRecords(numberOfRecords, typeSchema)),
    ])
    .then(() => Promise.all([
      knex('Movie').insert(getRecords(numberOfRecords, movieSchema)),
      knex('User').insert(getRecords(numberOfRecords, userSchema)),
    ])));
};

