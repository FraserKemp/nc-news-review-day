const connection = require('../db/connection');

const fetchAllTopics = () => {
  return connection
    .select('slug', 'description')
    .from('topics')
    .then(topics => {
      return topics;
    });
};

module.exports = { fetchAllTopics };
