const connection = require('../db/connection');

const fetchUserByUsername = username => {
  return connection
    .select('*')
    .from('users')
    .where('users.username', '=', username)
    .first()
    .then(user => {
      if (!user)
        return Promise.reject({ code: 400, msg: 'Username does not exist' });
    });
};

module.exports = { fetchUserByUsername };
