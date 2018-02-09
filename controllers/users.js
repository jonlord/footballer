'use strict';

module.exports = function(_, passport) {
  return {
    setRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.getSignupPage);
      router.post('/signup', this.postSignupPage);
      router.get('/home', this.indexPage);
    },
    indexPage: function(req, res) {
      return res.render('index');
    },
    getSignupPage: function(req, res) {
      return res.render('signup');
    },
    postSignupPage: passport.authenticate('signup.local', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true }
    ),
    homePage: function(req, res) {
      return res.render('home', {test: 'All is working!'});
    },
  }
}
