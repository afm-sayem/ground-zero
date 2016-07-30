exports.up = function (knex) {
  return knex.schema
    .createTable('review', (table) => {
      table.increments('id').primary();
      table.biginteger('movie_id').unsigned().references('id').inTable('movie')
        .onDelete('CASCADE');
      table.string('title');
      table.text('description');
      table.boolean('recommended');
      table.timestamps();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('review');
};
