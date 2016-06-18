
exports.up = function (knex) {
  return knex.schema
    .createTable('Person', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('Type', function (table) {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('Movie', function (table) {
      table.increments('id').primary();
      table.integer('directorId').unsigned().references('id').inTable('Person');
      table.integer('typeId').unsigned().references('id').inTable('Type');
      table.string('title');
      table.text('summary');
      table.string('poster');
      table.date('released');
    })
    .createTable('User', function (table) {
      table.increments('id').primary();
      table.string('name');
      table.string('facebook');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('User')
    .dropTableIfExists('Movie')
    .dropTableIfExists('Person')
    .dropTableIfExists('Type')
};
