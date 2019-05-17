const getAllEndpoints = (req, res, next) => {
  res.status(200).send({
    endpoints: {
      topics: {
        GET: {
          '/api/topics': 'returns all the topics',
          '/api/topics/:topicName':
            'returns the topic info, by given topic name'
        }
      },
      articles: {
        GET: {
          '/api/articles': 'returns all the articles',
          '/api/articles/:article_id':
            'returns all the articles by the given article_id',
          '/api/articles/:article_id/comments':
            'returns all the comments for a given article, by a article_id'
        },
        PATCH: {
          '/api/articles/:article_id':
            'returns a patched article by given article_id'
        },
        POST: {
          '/api/articles/:article_id/comments':
            'returns the newly POSTED comment, POSTED to a given article_id'
        }
      },
      comments: {
        PATCH: {
          '/api/comments/:comment_id':
            'returns the comment by the given comment_id'
        },
        DELETE: {
          '/api/comments/:comment_id':
            'returns the deleted comment by comment_id'
        }
      },
      users: {
        '/api/users/:username': 'returns the user by the username given'
      }
    }
  });
};

module.exports = { getAllEndpoints };
