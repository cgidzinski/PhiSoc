// server.js
// set up ======================================================================
// get all the tools we need
var express = require('express');
var app = express();
var port = process.env.PORT || 8082;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config/database.js');
var favicon = require('serve-favicon');
// Cors
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With,x-access-token');
// if ('OPTIONS' == req.method) 
// 	{
//       res.send(200);
//     }
//     else 
//     {
//       next();
//     }
// });
// configuration ===============================================================
if (!mongoose.connect(config.url)) {
    res.send("DB Fail");
} // connect to our database
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));
//
app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(__dirname + '/public'));
//
app.set('superSecret', config.secret); // secret variable
require('./controllers/passport')(passport); // pass passport for configuration
// required for passport
app.use(session({ secret: config.secret, cookie: { _expires: 60000000 } })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(favicon(__dirname + '/public/assets/favicon.ico'));
app.use(flash()); // use connect-flash for flash messages stored in session
// routes ======================================================================
require('./routes/root.js')(app, passport);
require('./routes/404.js')(app, passport);
// launch ======================================================================
mongoose.set('debug', true);
app.listen(port);
console.log('The magic happens on port ' + port);
