const connection = require('../db/connection');

const updateCommentById = (comment_id, inc_votes) => {
  return connection
    .into('comments')
    .where({ comment_id })
    .increment('votes', inc_votes)
    .returning('*');
};

const removeCommentById = comment_id => {
  return connection
    .select('comments')
    .from('comments')
    .where({ comment_id })
    .del();
};

module.exports = { updateCommentById, removeCommentById };
