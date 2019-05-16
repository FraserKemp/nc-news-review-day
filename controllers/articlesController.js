const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleById,
  fetchCommentsByArticleId,
  addNewComment
} = require('../models/articlesModel');

const { fetchUserByUsername } = require('../models/usersModel');

const getAllArticles = (req, res, next) => {
  const { author } = req.query;
  if (!author) {
    fetchAllArticles(req.query)
      .then(articles => {
        res.status(200).send({ articles });
      })
      .catch(next);
  } else
    Promise.all([fetchAllArticles(req.query), fetchUserByUsername(author)])
      .then(([articles, author]) => {
        if (!author)
          return Promise.reject({ code: 404, msg: 'Author does not exist' });
        else res.status(200).send({ articles });
      })
      .catch(next);
};

const getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

const getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  fetchCommentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const newComment = { article_id, author: username, body };
  addNewComment(newComment)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentByArticleId
};
