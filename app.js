const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const router = require('./routes/router');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://0.0.0.0:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64a480f6656f5d94d0851638',
  };

  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(PORT);
