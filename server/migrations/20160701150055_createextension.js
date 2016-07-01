const extension = 'pg_trgm';
exports.up = function(knex) {
  let createExtension = `CREATE EXTENSION ${extension}`;
  return knex.raw(createExtension);
};

exports.down = function(knex) {
  return knex.raw(`DROP EXTENSION ${extension}`);
};
