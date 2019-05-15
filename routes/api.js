const apiRouter = require('express').Router();
const { topicsRouter } = require('./topicsRouter');
const { articlesRouter } = require('./articlesRouter');
const { commentsRouter } = require('./commentsRouter');
const { methodNotAllowed } = require('../errors');

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter);

apiRouter.use('/articles', articlesRouter);

apiRouter.use('/comments', commentsRouter);

module.exports = apiRouter;
