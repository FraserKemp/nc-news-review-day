const {
  updateCommentById,
  removeCommentById
} = require('../models/commentsModel');

const patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  updateCommentById(comment_id, inc_votes)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

const deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then(comment => {
      res.status(204).send({ comment, msg: 'NO Ccontent' });
    })
    .catch(next);
};

module.exports = { patchCommentById, deleteCommentById };