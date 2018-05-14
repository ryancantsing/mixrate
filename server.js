var express = require("express");
var path = require("path");
var app = express();
var bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')
var session = require('express-session');
var passport = require('passport')

app.use(bodyParser.json());
app.use(express.static( __dirname + '/mixrateAngular/dist'));
require('./server/config/mongoose.js');
require('./server/config/passport.js')
app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
var routes_setter = require('./server/config/routes.js')(app);

app.listen(8000, function(){
    console.log("listening on port 8000")
});