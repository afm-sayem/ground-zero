exports.up = function (knex) {
  return knex.schema
    .createTable('movie_person', (table) => {
      table.increments('id').primary();
      table.integer('person_id').unsigned().references('id').inTable('person');
      table.integer('movie_id').unsigned().references('id').inTable('movie');
      table.string('character');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('person_movie');
};
