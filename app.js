const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser')
require('dotenv').config();

const taskRoutes = require('./api/routes/tasks');

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', taskRoutes);

app.use((req, res, next) => {
  const error = new Error('Not found!');
  error.status = 404;
  next(error);
})

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error:{
      message: error.message,
      status: error.status
    }
  })
})

module.exports = app;