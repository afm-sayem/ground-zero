exports.up = function (knex) {
  return knex.schema
    .createTable('person_movie', (table) => {
      table.increments('id').primary();
      table.integer('person_id').unsigned().references('id').inTable('person')
        .onDelete('CASCADE');
      table.integer('movie_id').unsigned().references('id').inTable('movie')
        .onDelete('CASCADE');
      table.string('character');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('person_movie');
};
