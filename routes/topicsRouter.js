const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topicsController');
const { methodNotAllowed } = require('../errors/index');

topicsRouter
  .route('/')
  .get(getAllTopics)
  .all(methodNotAllowed);

module.exports = { topicsRouter };
