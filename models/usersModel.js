const connection = require('../db/connection');

const fetchUserByUsername = username => {
  if (!username)
    return Promise.reject({ code: 400, msg: 'No username was given' });
  return connection
    .select('*')
    .from('users')
    .where('users.username', '=', username)
    .first()
    .then(user => {
      // if (!user)
      //   return Promise.reject({ code: 404, msg: 'Username does not exist' });
      // else
      return user;
    });
};

module.exports = { fetchUserByUsername };
