const apiRouter = require('express').Router();
const { topicsRouter } = require('./topicsRouter');
const { methodNotAllowed } = require('../errors');

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter);

module.exports = apiRouter;
