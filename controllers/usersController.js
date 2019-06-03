const {
  fetchUserByUsername,
  fetchAllUsers,
  insertNewUser
} = require('../models/usersModel');

const getUserByUsername = (req, res, next) => {
  const { username } = req.params;
  fetchUserByUsername(username)
    .then(user => {
      if (!user)
        return Promise.reject({ code: 404, msg: 'Username does not exist' });
      else res.status(200).send({ user });
    })
    .catch(next);
};

const getAllUsers = (req, res, next) => {
  fetchAllUsers()
    .then(users => {
      res.status(200).send({ users });
    })
    .catch(next);
};

const postNewUser = (req, res, next) => {
  const newUser = req.body;
  insertNewUser(newUser)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};

module.exports = { getUserByUsername, getAllUsers, postNewUser };
