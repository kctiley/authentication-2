var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/authentication-2');
var Users = db.get('users');

/* GET home page. */
router.get('/', function(req, res, next) {
  Users.find({}, function(err, record){
    res.render('index', { title: 'Authentication-2', allUsers: record });
  });
});

/* GET home page. */
router.get('/signup', function(req, res, next) {
  res.render('sign', { title: 'Authentication-2', subtitle: 'Sign Up' });
});


router.get('/signin', function(req, res, next) {
  res.render('sign', { title: 'Authentication-2', subtitle: 'Sign In', user: 'user' });
});

router.post('/', function(req, res, next){
  console.log("Req.body.inputEmail" + req.body.inputEmail);
  console.log("COOKIES>>>>>>>" + req.cookies.cookieNAME)
  res.cookie("cookieNAME", req.body.inputEmail)

  Users.insert({email: req.body.inputEmail, password: req.body.password}, function(err, record){
    res.render('index', {title: 'Authentication-2', statusSignedIn: true, userEmail: req.body.inputEmail})
  })
})

router.get('/logout', function(req, res, next){
  res.clearCookie("name");
  res.redirect('/')
})



module.exports = router;
