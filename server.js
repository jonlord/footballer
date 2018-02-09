const express = require('express')
const ejs = require('ejs')
const container = require('./container')
const router = require('express-promise-router')()
const cookieParser = require('cookie-parser')
const validator = require('express-validator')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const flash = require('connect-flash')
const passport = require('passport')


container.resolve(function(users) {
  mongoose.connect('mongodb://me:me@127.0.0.1:27017/footballer');

  const app = setupExpress();

  function setupExpress() {
      const app = express();
      app.listen(3000, function() {
        console.log('Example app listening on port 3000!')
      });

      configureExpress(app);

      users.setRouting(router);
      app.use(router);
  }

  function configureExpress(app) {
    app.use(express.static('public'));
    app.engine('ejs', ejs.renderFile);
    app.set('view engine', 'ejs');
    app.use(express.json());
    app.use(express.urlencoded({extended: true  }));

    app.use(validator());
    app.use(session({
      secret: 'thomasinsegreto',
      resave: true,
      saveUninitialized: true,
      store: new MongoStore(
        {
          mongooseConnection: mongoose.connection
        }
      )
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
  }

})
