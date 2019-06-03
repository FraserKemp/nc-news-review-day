const connection = require('../db/connection');

const fetchAllArticles = ({
  sort_by = 'created_at',
  order = 'desc',
  author,
  topic,
  limit = 10,
  p = 1
}) => {
  if (order !== 'asc' && order !== 'desc' && order !== undefined) {
    return Promise.reject({ code: 400 });
  } else
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
      .limit(limit)
      .offset((p - 1) * limit)
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

const countOfArticles = () => {
  return connection('articles')
    .count()
    .first()
    .then(count => {
      return count;
    });
};

const fetchArticleById = article_id => {
  return connection
    .select(
      'articles.article_id',
      'articles.title',
      'articles.body',
      'articles.votes',
      'articles.topic',
      'articles.author',
      'articles.created_at'
    )
    .count('comments.article_id as comment_count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .where('articles.article_id', article_id)
    .first()
    .then(article => {
      if (!article) return Promise.reject({ code: 404 });
      else return article;
    });
};

const updateArticleById = (article_id, inc_votes = 0) => {
  if (typeof inc_votes === 'number' || !inc_votes) {
    return connection
      .into('articles')
      .where({ article_id })
      .increment('votes', inc_votes)
      .returning('*')
      .then(([article]) => {
        if (!article) return Promise.reject({ code: 404 });
        else return article;
      });
  } else
    return Promise.reject({
      code: 400,
      msg: 'Bad Request! Body is not a number'
    });
};

const fetchCommentsByArticleId = ({
  article_id,
  sort_by = 'created_at',
  order = 'desc',
  limit = 10,
  p = 1
}) => {
  if (!article_id)
    return Promise.reject({ code: 400, msg: 'article_id must be a number' });
  else
    return connection
      .select('*')
      .from('comments')
      .limit(limit)
      .offset((p - 1) * limit)
      .where({ article_id })
      .orderBy(sort_by, order)
      .returning('*')
      .then(comment => {
        if (!comment) return Promise.reject({ code: 404 });
        else return comment;
      });
};

const addNewComment = newComment => {
  if (!newComment.author || !newComment.body)
    return Promise.reject({ code: 400, msg: 'Incorrect comment format' });
  else
    return connection
      .into('comments')
      .insert(newComment)
      .returning('*')
      .then(([comment]) => {
        return comment;
      });
};

module.exports = {
  fetchAllArticles,
  fetchArticleById,
  updateArticleById,
  fetchCommentsByArticleId,
  addNewComment,
  countOfArticles
};
