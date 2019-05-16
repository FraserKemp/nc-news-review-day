const {
  updateCommentById,
  removeCommentById
} = require('../models/commentsModel');

const patchCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;
  console.log(inc_votes);
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
      res.sendStatus(204);
    })
    .catch(next);
};

module.exports = { patchCommentById, deleteCommentById };
