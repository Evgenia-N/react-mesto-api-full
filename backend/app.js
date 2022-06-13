require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;
const app = express();

const allowedDomains = [
  'https://evgex.nomoredomains.work',
  'http://evgex.nomoredomains.work',
  'http://localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedDomains.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', origin);
    const { method } = req;
    const DEFAULT_ALLOWED_METHODS = 'GET,PUT,PATCH,POST,DELETE';
    if (method === 'OPTIONS') {
      const requestHeaders = req.headers['access-control-request-headers'];
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
    }
  }
  next();
});

app.use(cookieParser());
app.use(requestLogger);
// app.get('/crash-test', () => {
//  setTimeout(() => {
//    throw new Error('Сервер сейчас упадёт');
//  }, 0);
// });
app.use(userRoutes);
app.use(cardRoutes);
app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Страница по указанному адресу не найдена'));
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('Connected to Database');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

main();
