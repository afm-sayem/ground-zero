exports.up = function(knex) {
  return knex.schema
    .createTable('Person_Movie', function (table) {
      table.bigincrements('id').primary();
      table.biginteger('personId').unsigned().references('id').inTable('Person').onDelete('CASCADE');
      table.biginteger('movieId').unsigned().references('id').inTable('Movie').onDelete('CASCADE');
      table.string('character');
    }); 
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('Person_Movie');
};
