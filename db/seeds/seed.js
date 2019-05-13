const {
  articleData,
  commentData,
  topicsData,
  usersData
} = require('../data/index');

const { changeTimestamp, createRef, renameKey } = require('../../utils/utils');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex.insert(topicsData).into('topics');
    })
    .then(topics => {
      return knex.insert(usersData).into('users');
    })
    .then(users => {
      changeTimestamp(articleData);
      return knex
        .insert(articleData)
        .into('articles')
        .returning('*');
    })
    .then(articles => {
      changeTimestamp(commentData);
      const ref = createRef(articles, 'title', 'article_id');
      const changedCommentsKey = renameKey(
        commentData,
        'belongs_to',
        'article_id'
      );
      const finalData = data.map(obj => {
        obj.article_id = ref[obj.article_id];
        return treasure;
      });
      console.log(changedCommentsKey);
      return knex
        .insert(finalData)
        .into('comment')
        .returning('*');
    });
};
