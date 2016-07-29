
exports.up = function (knex) {
  return knex.schema
    .createTable('person', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('type', (table) => {
      table.increments('id').primary();
      table.string('name');
    })
    .createTable('movie', (table) => {
      table.increments('id').primary();
      table.integer('director_id').unsigned().references('id').inTable('person');
      table.integer('type_id').unsigned().references('id').inTable('type');
      table.string('title');
      table.text('summary');
      table.string('poster');
      table.date('released');
    })
    .createTable('user', (table) => {
      table.increments('id').primary();
      table.string('name');
      table.string('facebook');
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('user')
    .dropTableIfExists('movie')
    .dropTableIfExists('person')
    .dropTableIfExists('type');
};
