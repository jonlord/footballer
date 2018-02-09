const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if(user) {
        return done(null, false, req.flash('error', 'This email already exists'));
      }

      const newUser = new User();
      newUser.email = req.body.email;
      newUser.password = newUser.encryptPassword(req.body.password);
      newUser.username = req.body.username;

      newUser.save(function(err) {
        if(err) { return done(err); }

        return done(null, newUser);
      });
    });
  }
));
