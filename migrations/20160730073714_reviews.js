exports.up = function (knex) {
  return knex.schema
    .createTable('review', (table) => {
      table.increments('id').primary();
      table.integer('movie_id').unsigned().references('id').inTable('movie')
        .onDelete('CASCADE');
      table.text('description');
      table.boolean('recommended');
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('review');
};
