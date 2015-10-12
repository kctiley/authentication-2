var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/authentication-2');
var Users = db.get('users');
var bcrypt = require('bcrypt');


router.get('/', function(req, res, next) {
  Users.find({}, function(err, record){
    res.render('index', { title: 'Authentication-2', allUsers: record });
  });
});

router.get('/signup', function(req, res, next) {
  res.render('sign', { title: 'Authentication-2', subtitle: 'Sign Up' });
});

router.post('/signup', function(req, res, next){

  var errors = [];
  if (!req.body.inputEmail){
    errors.push("No email entered")
  }
  if (!req.body.inputPassword){
    errors.push("No password entered")
  }
  if (errors.length){
    res.render('sign', {title: "Auth-2", errors: errors}) 
  }
  else{
    Users.find({email: req.body.inputEmail}, function(err, record){
      if (record.length){
        errors.push('Useremail not available');
      }
      if (errors.length){
        res.render('sign', { title: 'Authentication-2', subtitle: 'Sign Up', errors: errors})
      }
      else{
        req.session.username = req.body.inputEmail;
        var hashedPassword = bcrypt.hashSync(req.body.inputPassword, 8)
        Users.insert({email: req.body.inputEmail, password: hashedPassword}, function(err, record){
          res.render('index', {title: 'Authentication-2', statusSignedIn: true, userEmail: req.body.inputEmail})
        })
      };
    })
  }
})

router.get('/signin', function(req, res, next) {
    res.render('sign', { title: 'Authentication-2', subtitle: 'Sign In', user: 'user' });
});

router.post('/signin', function(req, res, next){
  var errors = [];
  if (!req.body.inputEmail){
    errors.push("No email entered")
  }
  if (!req.body.inputPassword){
    errors.push("No password entered")
  }
  if (errors.length){
    res.render('sign', {title: "Auth-2", errors: errors}) 
  }
  else{
    Users.findOne({email: req.body.inputEmail}, function(err, record){ 
      if(record){
        console.log('The record.....' + record.email);
        var hashedPassword = req.body.inputPassword;
        if(bcrypt.compareSync(hashedPassword, record.password)){
          req.session.username = req.body.inputEmail;;
          res.render('index', {title: "Auth-2",statusSignedIn: true, userEmail: req.body.inputEmail})
        }
      }
      else{
        errors.push('Cannot find user email')
        res.render('sign', {title: "Auth-2", user: 'user', errors: errors})      
      }
    })
  }
})  



router.get('/logout', function(req, res, next){
  req.session = null;
  res.redirect('/')
})



module.exports = router;
