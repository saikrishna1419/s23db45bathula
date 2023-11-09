var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const mobile = require('./models/mobiles');

require('dotenv').config();
const connectionString = "mongodb+srv://krishna:Mongo17@cluster0.nos1gz9.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(connectionString);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var electronicsRouter = require('./routes/mobiles');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var mobilesRouter = require('./models/mobiles');
var resourceRouter = require('./routes/resource');


var app = express();

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
app.use('/mobiles', electronicsRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/mobiles', mobilesRouter);
app.use('/resource', resourceRouter);



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

async function recreateDB() {
  // Delete everything from the Horse model
  await mobile.deleteMany();

  let instance1 = new mobile({ productName: '15Pro', brand: 'Apple', price: 1299 });
  instance1.save().then(doc => {
    console.log("First mobile saved");
  }).catch(err => {
    console.error(err);
  });

  let instance2 = new mobile({ productName: 'S23', brand: 'Samsung', price: 1199 });
  instance2.save().then(doc => {
    console.log("Second mobile saved");
  }).catch(err => {
    console.error(err);
  });

  let instance3 = new mobile({ productName: '11Pro', brand: 'Oneplus', price: 999 });
  instance3.save().then(doc => {
    console.log("Third mobile saved");
  }).catch(err => {
    console.error(err);
  });
}

let reseed = true;
if (reseed) { recreateDB(); }

module.exports = app;

