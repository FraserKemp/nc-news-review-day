exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', usersTable => {
    usersTable.string('username').primary();
    usersTable.text('avatar_url').notNullable();
    usersTable.string('name').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
