var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// importing env lookup module
require('dotenv').config();
const password = encodeURIComponent(process.env.MONGO_PASS);
const username = process.env.USER;
// importing routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const wikiRouter = require('./routes/wiki');
const catalogRouter = require('./routes/catalog');

var app = express();

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = `mongodb://${username}:${password}@cluster0-shard-00-00.nektk.mongodb.net:27017,cluster0-shard-00-01.nektk.mongodb.net:27017,cluster0-shard-00-02.nektk.mongodb.net:27017/local_library?ssl=true&replicaSet=atlas-h6huv8-shard-0&authSource=admin&retryWrites=true&w=majority`;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
app.use('/wiki', wikiRouter);
app.use('/catalog', catalogRouter);

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
