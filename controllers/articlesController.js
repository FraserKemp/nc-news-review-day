const {
  fetchAllArticles,
  fetchArticleById,
  updateArticleById,
  fetchCommentsByArticleId,
  addNewComment,
  countOfArticles,
  addNewArticle
} = require('../models/articlesModel');

const { fetchUserByUsername } = require('../models/usersModel');

const { fetchTopicByName } = require('../models/topicsModels');

const getAllArticles = (req, res, next) => {
  const { author } = req.query;
  const { topic } = req.query;

  if (!author && !topic) {
    return Promise.all([fetchAllArticles(req.query), countOfArticles()])
      .then(([articles, count]) => {
        const total_count = count.count;
        res.status(200).send({ total_count, articles });
      })
      .catch(next);
  } else {
    Promise.all([
      topic ? fetchTopicByName(topic) : null,
      author ? fetchUserByUsername(author) : null
    ])
      .then(([topicRows, authorRows]) => {
        if (authorRows !== null && !authorRows) {
          return Promise.reject({ code: 404, msg: 'Author does not exist' });
        } else if (topicRows !== null && !topicRows) {
          return Promise.reject({ code: 404, msg: 'Topic does not exist' });
        } else return fetchAllArticles(req.query);
      })
      .then(articles => {
        return Promise.all([articles, countOfArticles()]);
      })
      .then(([articles, count]) => {
        const total_count = count.count;
        res.status(200).send({ total_count, articles });
      })
      .catch(next);
  }
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
  const { sort_by, order, p } = req.query;
  const params = { article_id, sort_by, order, p };
  fetchArticleById(article_id)
    .then(article => {
      if (!article) return Promise.reject({ code: 404 });
      else return fetchCommentsByArticleId(params);
    })
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

const postNewArticle = (req, res, next) => {
  const { title, body, topic, username } = req.body;
  const newArticle = { title, body, topic, author: username };
  addNewArticle(newArticle)
    .then(article => {
      res.status(201).send({ article });
    })
    .catch(next);
};

module.exports = {
  getAllArticles,
  getArticleById,
  patchArticleById,
  getCommentsByArticleId,
  postCommentByArticleId,
  postNewArticle
};
