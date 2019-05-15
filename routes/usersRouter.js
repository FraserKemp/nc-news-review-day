const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/usersController');
const { methodNotAllowed } = require('../errors/index');

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(methodNotAllowed);

module.exports = { usersRouter };
