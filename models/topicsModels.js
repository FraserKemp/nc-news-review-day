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

const insertNewTopic = newTopic => {
  if (!newTopic) return Promise.reject({ code: 400, msg: 'Incorrect Format' });
  return connection
    .into('topics')
    .insert(newTopic)
    .returning('*')
    .then(([topic]) => {
      return topic;
    });
};

module.exports = { fetchAllTopics, fetchTopicByName, insertNewTopic };
