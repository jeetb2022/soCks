var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');

var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var usersRouter = require('./routes/users');
const  session  = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
// app.use(express-session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/auth/google', authRouter);
// app.use('/auth/google/callback', authRouter);
// app.use('/users', usersRouter);


//Code Starts here

// Client id : 686718387830-sjamhu7cnu8hljnogfeqmblcat65ctri.apps.googleusercontent.com
// client secret : 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

// app.get('/',(req,res)=>{
//   // res.render('index',{title : "Trial"});
//   res.render('index');
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true
}))
const methodOverride = require("method-override");
app.use(passport.initialize());
app.use(passport.session());
require('./authGoogle');
app.get("/",(req, res) => {
  res.render("login");
});
app.get("/index", checkAuthenticated, (req, res) => {
  res.render("index");
});
app.get('/auth/google',
passport.authenticate('google', { scope:
  [ 'email', 'profile' ] }
  ));
  
  app.get('/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/index',
    failureRedirect: '/login'
  }));
  
  function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()) { 
      return next()
    }
      else {
        res.redirect("/login")
      }
  }


// });






//Code ends here 

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

app.listen(process.env.PORT||3000, () => {
  console.log("the server is running on port 3000");
});
