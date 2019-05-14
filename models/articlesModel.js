const connection = require('../db/connection');

const fetchAllArticles = ({
  sort_by = 'created_at',
  order = 'desc',
  author,
  topic
}) => {
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
    .then(articles => {
      return articles;
    });
};

module.exports = { fetchAllArticles, fetchArticleById };
