exports.routeNotFound = (req, res) => {
  res.status(404).send({ msg: 'Route Not Found' });
};

exports.methodNotAllowed = (req, res, next) => {
  res.status(405).send({ msg: 'Method Not Allowed' });
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: 'Internal Server Error' });
};

exports.columnDoesNotExist = (err, req, res, next) => {
  const codes = { 42703: 'Column does not exist' };
  if (codes[err.code]) {
    res.status(404).send({ msg: codes[err.code] });
  } else next(err);
};
