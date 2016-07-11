
exports.up = function(knex) {
  // alter user table to add email(unique), hash, salt, google
  // https://github.com/tgriesser/knex/issues/46
  return knex.schema
    .table('User', function (table) {
      table.string('hash');
      table.string('salt');
      table.string('email').unique();
      table.string('google').unique();
    });
};

exports.down = function(knex) {
  return knex.schema
    .table('User', function (table) {
      table.dropColumns('hash', 'salt', 'email', 'google');
    });
};
