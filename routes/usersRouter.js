const usersRouter = require('express').Router();
const {
  getUserByUsername,
  postNewUser,
  getAllUsers
} = require('../controllers/usersController');
const { methodNotAllowed } = require('../errors/index');

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(postNewUser)
  .all(methodNotAllowed);

usersRouter
  .route('/:username')
  .get(getUserByUsername)
  .all(methodNotAllowed);

module.exports = { usersRouter };
