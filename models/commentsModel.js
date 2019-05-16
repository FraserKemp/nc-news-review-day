const connection = require('../db/connection');

const updateCommentById = (comment_id, inc_votes) => {
  return connection
    .into('comments')
    .where({ comment_id })
    .increment('votes', inc_votes)
    .returning('*')
    .then(comment => {
      if (comment.length === 0) return Promise.reject({ code: 404 });
      else return comment;
    });
};

const removeCommentById = comment_id => {
  return connection
    .select('comments')
    .from('comments')
    .where({ comment_id })
    .del()
    .then(comment => {
      if (comment === 0) return Promise.reject({ code: 404 });
      else return comment;
    });
};

module.exports = { updateCommentById, removeCommentById };
