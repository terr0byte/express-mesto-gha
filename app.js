require('dotenv').config();

const express = require('express');

const helmet = require('helmet');

const rateLimit = require('express-rate-limit');

const mongoose = require('mongoose');

const { errors } = require('celebrate');

const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const { requestLogger, errorLogger } = require('./middlewares/logger'); 

const router = require('./routes/router');

const { PORT = 3000, DB_URL = 'mongodb://0.0.0.0:27017/mestodb' } = process.env;

const allowedCors = [
  'localhost:3000',
  'localhost:3001',
];

const app = express();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(function(req, res, next) {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  };

  const { method } = req; 

  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers['access-control-request-headers'];

  if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      return res.end();
  };

  next();
}); 

app.use('/api', apiLimiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  const sendMessage = statusCode === 500
    ? 'На сервере произошла ошибка'
    : message;

  res.status(statusCode).send({ message: sendMessage });
});

app.listen(PORT);
