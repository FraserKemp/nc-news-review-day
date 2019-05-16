const { fetchUserByUsername } = require('../models/usersModel');

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

module.exports = { getUserByUsername };
