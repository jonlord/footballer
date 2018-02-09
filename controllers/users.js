'use strict';

module.exports = function(_) {
  return {
    setRouting: function(router) {
      router.get('/', this.indexPage);
      router.get('/signup', this.signupPage);
    },
    indexPage: function(req, res) {
      return res.render('index', {test: 'All is working!'});
    },
    signupPage: function(req, res) {
      return res.render('signup');
    }
  }
}
