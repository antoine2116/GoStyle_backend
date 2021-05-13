// server.js

// set up ======================================================================
var express      = require('express');
var session      = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
const cors       = require("cors");
var morgan       = require('morgan');
var app          = express();
var port         = process.env.PORT || 8080;
var passport     = require('passport');
var flash        = require('connect-flash');

// configuration ===============================================================
require('./config/passport')(passport); // pass passport for configuration

// set up cors
var corsOptions = {
	origin: 'http://localhost:8080'
};

app.use(cors(corsOptions));

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

app.use(session({
	secret: 'vidyapathaisalwaysrunning',
	resave: true,
	saveUninitialized: true
 } ));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// database sequelize
const db = require('./app/sequelize');

// sync database
db.sequelize.sync();

// reset datatable
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// routes ======================================================================
require('./app/routes/authentification_routes.js')(app, passport);
require('./app/routes/coupons_routes.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
