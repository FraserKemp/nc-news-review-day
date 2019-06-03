const {
  fetchAllTopics,
  fetchTopicByName,
  insertNewTopic
} = require('../models/topicsModels');

const getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

const getTopicByName = (req, res, next) => {
  const { theTopic } = req.params;
  fetchTopicByName(theTopic)
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(next);
};

const postNewTopic = (req, res, next) => {
  const newTopic = req.body;
  insertNewTopic(newTopic)
    .then(topic => {
      res.status(200).send({ topic });
    })
    .catch(next);
};

module.exports = { getAllTopics, getTopicByName, postNewTopic };
