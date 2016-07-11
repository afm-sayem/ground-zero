const index_name = 'tsv_idx';
exports.up = function(knex) {
  // Create text search index on movies
  // http://rachbelaid.com/postgres-full-text-search-is-good-enough/
  // let query = `CREATE INDEX tsv_idx ON ${table} USING gin(setweight(to_tsvector(${columns[0]}), 'A') || setweight(to_tsvector(${columns[1]}), 'B'))`
  let table = '"Movie"';
  let column = 'title';
  let query = `CREATE INDEX ${index_name} ON ${table} USING gin(${column} gin_trgm_ops)`;
  return knex.raw(query);
};

exports.down = function(knex) {
  return knex.raw(`DROP INDEX ${index_name}`);
};
