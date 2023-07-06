var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const bicicletaRouter = require('./routes/bicicletas');
const bicicletasAPIrouter = require('./routes/api/bicicletas');
const usuariosAPIrouter = require('./routes/api/usuarios');
const mailer = require('../red-bicicletas/mailer/mailer');

var app = express();


require('dotenv').config();

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONNECTION_STRING, { useNewUrlParser: true});
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to database');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/bicicletas', bicicletaRouter);
app.use('/api/bicicletas', bicicletasAPIrouter);
app.use('/api/usuarios', usuariosAPIrouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
