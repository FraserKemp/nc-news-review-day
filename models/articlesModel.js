const connection = require('../db/connection');

const fetchAllArticles = ({ sort_by = 'created_at' }) => {
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
    .count('comments.article_id as count')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .groupBy('articles.article_id')
    .orderBy(sort_by)
    .then(articles => {
      console.log(articles);
      return articles;
    });
};

module.exports = { fetchAllArticles };
