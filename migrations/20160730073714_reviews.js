function up(knex) {
  return knex.schema
    .createTable('review', (table) => {
      table.increments('id').primary();
      table.integer('movie_id').unsigned().references('id').inTable('movie');
      table.integer('user_id').unsigned().references('id').inTable('user');
      table.text('description');
      table.boolean('recommended');
      table.timestamps();
    });
}

function down(knex) {
  return knex.schema
    .dropTableIfExists('review');
}

module.exports = { up, down };
