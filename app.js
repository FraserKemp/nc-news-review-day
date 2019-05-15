const express = require('express');
const apiRouter = require('./routes/api');
const {
  routeNotFound,
  handle500,
  methodNotAllowed,
  columnDoesNotExist,
  idDoesNotExist
} = require('./errors');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('/*', routeNotFound);

app.use(columnDoesNotExist);

app.use(idDoesNotExist);

app.use(handle500);

module.exports = app;
