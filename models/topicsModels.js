const connection = require('../db/connection');

const fetchAllTopics = () => {
  return connection
    .select('slug', 'description')
    .from('topics')
    .then(topics => {
      return topics;
    });
};

const fetchTopicByName = theTopic => {
  return connection
    .select('*')
    .from('topics')
    .where('slug', theTopic)
    .first()
    .then(topic => {
      return topic;
    });
};

module.exports = { fetchAllTopics, fetchTopicByName };
