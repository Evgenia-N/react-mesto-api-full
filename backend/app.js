require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;
const app = express();
const allowedCors = [
  'https://evgex.nomoredomains.work',
  'http://evgex.nomoredomains.work',
  'localhost:3000',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (allowedCors.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Ошибка CORS'));
      }
    },
    credentials: true,
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: 'GET, POST, PUT, PATCH, DELETE',
  }),
);

// app.use(cors({
//  origin: ['https://evgex.nomoredomains.work', 'http://evgex.nomoredomains.work'],
//  credentials: true,
// ));
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
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
