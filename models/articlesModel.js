const connection = require('../db/connection');

const fetchAllArticles = ({ sort_by = 'created_at', order, author, topic }) => {
  if (order !== 'asc') order = 'desc';
  console.log(order);
  return connection
    .select(
      'articles.article_id',
      'articles.title',
      'articles.votes',
      'articles.topic',
      'articles.author',
      'articles.created_at'
    )
    .count('comments.article_id as comment_count')
    .from('articles')
    .modify(query => {
      if (author) query.where('articles.author', author);
      if (topic) query.where('articles.topic', topic);
    })
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by, order)
    .then(articles => {
      return articles;
    });
};

const fetchArticleById = article_id => {
  return connection
    .select('*')
    .from('articles')
    .where({ article_id })
    .first()
    .then(article => {
      if (!article) return Promise.reject({ code: 404 });
      else return article;
    });
};

const updateArticleById = (article_id, inc_votes) => {
  return connection
    .into('articles')
    .where({ article_id })
    .increment('votes', inc_votes)
    .returning('*')
    .then(article => {
      if (article.length === 0) return Promise.reject({ code: 404 });
      else return article;
    });
};

const fetchCommentsByArticleId = (
  article_id,
  sort_by = 'created_at',
  order = 'desc'
) => {
  return connection
    .select('*')
    .from('comments')
    .where({ article_id })
    .orderBy(sort_by, order)
    .returning('*')
    .then(comment => {
      if (comment.length === 0) return Promise.reject({ code: 404 });
      else return comment;
    });
};

const addNewComment = newComment => {
  return connection
    .into('comments')
    .insert(newComment)
    .returning('*');
};
module.exports = {
  fetchAllArticles,
  fetchArticleById,
  updateArticleById,
  fetchCommentsByArticleId,
  addNewComment
};
