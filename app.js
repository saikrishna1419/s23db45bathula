var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Allow access to the passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//Authentication
passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)

//Username and password
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

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mobiles', electronicsRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/mobiles', mobilesRouter);
app.use('/resource', resourceRouter);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

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

