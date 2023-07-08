var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('./config/passport');
const session = require('express-session');

var indexRouter = require('./routes/index');
const usuariosRouter = require('./routes/usuarios');
const bicicletaRouter = require('./routes/bicicletas');
const bicicletasAPIrouter = require('./routes/api/bicicletas');
const usuariosAPIrouter = require('./routes/api/usuarios');
const tokenRouter = require('./routes/token');
const loginRouter = require('./routes/login');

//La sesion se guardara localmente en el servidor
const store = new session.MemoryStore;

var app = express();
app.use(session({
  cookie: {maxAge: 1000 * 60 * 60 * 240},
  store: store,
  saveUninitialized: true,
  resave: true,
  secret: 'red-bicis'
}));

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
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/login', loginRouter);
app.get('/logout', (req, res) => {
  res.redirect('/');
});

app.get('/forgotPassword', (req, res) => {

});

app.post('/forgotPassword', (req, res) => {

});


app.use('/', indexRouter);
app.use('/usuarios', usuariosRouter);
app.use('/token', tokenRouter);

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
