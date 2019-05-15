const commentsRouter = require('express').Router();
const {
  patchCommentById,
  deleteCommentById
} = require('../controllers/commentsController');
const { methodNotAllowed } = require('../errors/index');

commentsRouter
  .route('/:comment_id')
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(methodNotAllowed);

module.exports = { commentsRouter };
