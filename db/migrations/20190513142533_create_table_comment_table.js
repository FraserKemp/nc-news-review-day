exports.up = function(knex, Promise) {
  console.log('creating comment table...');
  return knex.schema.createTable('comment', commentTable => {
    commentTable.integer('comment_id').primary();
    commentTable.string('author').references('users.username');
    commentTable.integer('article_id').references('articles.article_id');
    commentTable.integer('votes').defaultTo(0);
    commentTable.string('created_at').defaultTo(new Date());
    commentTable.text('body').notNullable();
  });
};

exports.down = function(knex, Promise) {
  console.log('removing articles tables...');
  return knex.schema.dropTable('comment');
};
