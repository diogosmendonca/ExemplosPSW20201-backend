var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var passport = require('passport');
var authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var projetosRouter = require('./routes/projetos');
var atividadesRouter = require('./routes/atividades');
var usersRouter = require('./routes/users');

var config = require('./config');

const mongoose = require('mongoose');

const url =  config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-73567-54321'));


app.use(passport.initialize());

//app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/projetos', projetosRouter);
app.use('/atividades', atividadesRouter);

module.exports = app;
