const topicsRouter = require('express').Router();
const {
  getAllTopics,
  getTopicByName,
  postNewTopic
} = require('../controllers/topicsController');
const { methodNotAllowed } = require('../errors/index');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .post(postNewTopic)
  .all(methodNotAllowed);

topicsRouter
  .route('/:theTopic')
  .get(getTopicByName)
  .all(methodNotAllowed);

module.exports = { topicsRouter };
