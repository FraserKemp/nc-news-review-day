const articlesRouter = require('express').Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  postNewArticle
} = require('../controllers/articlesController');
const { methodNotAllowed } = require('../errors/index');

articlesRouter
  .route('/')
  .get(getAllArticles)
  .post(postNewArticle)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .all(methodNotAllowed);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(methodNotAllowed);

module.exports = { articlesRouter };
