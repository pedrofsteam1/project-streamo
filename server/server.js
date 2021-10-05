
(async () => {
  const express = require('express');
  const path = require('path');
  const http = require('http');
  const bodyParser = require('body-parser');
  const app = express();
  const port = process.env.PORT || 5000;
  const passport = require('passport');
  const cookieParser = require('cookie-parser');
  const logger = require('morgan');
  const Session = require('express-session');
  const flash = require('connect-flash');
  
  require('./modules/Auth')(passport);
  require('dotenv-safe').config();
  const debug = require('debug')('nodejs-passport-mysql:server');
  const MySQLStore = require('express-mysql-session')(Session);

  //Middleware
  const session = Session({
    store: new MySQLStore({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 24 * 60 * 60 * 365 * 1000
    }
  });
  

  try {
    await require('./database/db').connect();
  } catch (err) {
    return console.log(err);
  }


  app.use(express.static('public'));
  app.use(flash());


  app.use(session);

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended: true
  }));

  const server = http.createServer(app);

  


  //Routes Views Api
  
  const views = require('./view/views');
  views.views(app);


  //Start Server
  server.listen(port, '0.0.0.0', function () {
      console.log('App listening on port: ' + port);
  });
})()

