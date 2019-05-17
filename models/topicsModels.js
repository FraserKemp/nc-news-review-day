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
      if (!topic)
        return Promise.reject({ code: 404, msg: 'Topic does not exist' });
      else return topic;
    });
};

module.exports = { fetchAllTopics, fetchTopicByName };
