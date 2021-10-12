var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var coolRouter = require('./routes/cool');
var app = express();

// get user info from module
const userinfo = require('./userinfo');
const password = encodeURIComponent(userinfo.pass);
const uri = `mongodb://rishaan:${password}@cluster0-shard-00-00.nektk.mongodb.net:27017,cluster0-shard-00-01.nektk.mongodb.net:27017,cluster0-shard-00-02.nektk.mongodb.net:27017/local_library?ssl=true&replicaSet=atlas-h6huv8-shard-0&authSource=admin&retryWrites=true&w=majority`;
// setup mongoDB

const mongoose = require('mongoose');
const mongoDB = uri;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cool', coolRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
