const {
  articleData,
  commentData,
  topicsData,
  usersData
} = require('../data/index');

const {
  changeTimestamp,
  createRef,
  renameKey,
  changeValues
} = require('../../utils/utils');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex.insert(topicsData).into('topics');
    })
    .then(() => {
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
      const changedTitleKey = renameKey(
        commentData,
        'belongs_to',
        'article_id'
      );
      const finalData = changeValues(changedTitleKey, ref, 'article_id');
      const changedCreated_byKey = renameKey(finalData, 'created_by', 'author');
      return knex
        .insert(changedCreated_byKey)
        .into('comment')
        .returning('*');
    });
};
