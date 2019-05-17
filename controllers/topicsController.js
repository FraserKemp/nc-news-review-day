const { fetchAllTopics, fetchTopicByName } = require('../models/topicsModels');

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

module.exports = { getAllTopics, getTopicByName };
