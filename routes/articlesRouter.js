const articlesRouter = require('express').Router();
const { getAllArticles } = require('../controllers/articlesController');

articlesRouter.route('/').get(getAllArticles);

module.exports = { articlesRouter };
