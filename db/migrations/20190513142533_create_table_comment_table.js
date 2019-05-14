exports.up = function(knex, Promise) {
  console.log('creating comment table...');
  return knex.schema.createTable('comments', commentTable => {
    commentTable.increments('comment_id').primary();
    commentTable.string('author').references('users.username');
    commentTable.integer('article_id').references('articles.article_id');
    commentTable.integer('votes').defaultTo(0);
    commentTable
      .datetime('created_at', { precision: 6 })
      .defaultTo(knex.fn.now(6));
    commentTable.text('body').notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log('removing articles tables...');
  return knex.schema.dropTable('comments');
};
