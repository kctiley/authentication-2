var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/authentication-2');
var Users = db.get('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Authentication-2' });
});

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('sign', { title: 'Authentication-2', subtitle: 'Sign Up' });
});


router.get('/signin', function(req, res, next) {
  res.render('sign', { title: 'Authentication-2', subtitle: 'Sign In', user: 'user' });
});

module.exports = router;
