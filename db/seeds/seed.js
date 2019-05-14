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
      return knex.insert(topicsData).into('topics'); // inserting data into the topics table
    })
    .then(() => {
      return knex.insert(usersData).into('users'); // inserting data into the users table
    })
    .then(users => {
      changeTimestamp(articleData);
      return knex
        .insert(articleData) // inserting data into the article table
        .into('articles')
        .returning('*');
    })
    .then(articles => {
      changeTimestamp(commentData);
      const ref = createRef(articles, 'title', 'article_id'); // creating a reference object of all the 'titles' and 'article_id's'
      const changedTitleKey = renameKey(
        commentData,
        'belongs_to',
        'article_id'
      ); // changing the key 'belongs_to' to now be 'article_id'
      const finalData = changeValues(changedTitleKey, ref, 'article_id'); // inserting the correct 'article_id's' into the correct key
      const changedCreated_byKey = renameKey(finalData, 'created_by', 'author'); // changing the key 'created_by' to author
      return knex
        .insert(changedCreated_byKey)
        .into('comments')
        .returning('*');
    });
};
