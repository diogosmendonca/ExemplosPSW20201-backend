var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);

var indexRouter = require('./routes/index');
var projetosRouter = require('./routes/projetos');
var atividadesRouter = require('./routes/atividades');

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/pragmapm';
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser('12345-67890-73567-54321'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-73567-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));


function auth (req, res, next) {
  console.log(req.session);

  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');
        err.status = 401;
        next(err);
        return;
    }

    var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    var user = auth[0];
    var pass = auth[1];
    if (user == 'admin' && pass == 'password') {
        req.session.user = 'admin';
        next(); // authorized
    } else {
        var err = new Error('You are not authenticated!');
        res.setHeader('WWW-Authenticate', 'Basic');      
        err.status = 401;
        next(err);
    }
  }else{
    if (req.session.user === 'admin') {
      console.log('req.session: ',req.session);
      next();
    }
    else {
        var err = new Error('You are not authenticated!');
        err.status = 401;
        next(err);
    }
  }
}

app.use(auth);


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/projetos', projetosRouter);
app.use('/atividades', atividadesRouter);

module.exports = app;
