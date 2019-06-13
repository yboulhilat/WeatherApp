var express = require('express');
var router = express.Router();
var userModel = require('../models/user');


////////////* Sign-up *////////////
router.post('/sign-up', function (req, res, next) {
 
  userModel.findOne(
    { email: req.body.emailFromFront }, function(error, user){
      if (!user) {
        var newUser = new userModel({
          username: req.body.usernameFromFront,
          email: req.body.emailFromFront.toLowerCase(),
          password: req.body.passwordFromFront,
        });
        newUser.save(function (error, user) {
          req.session.user = user;
          res.redirect('/villes');
        });
      } else {
        res.redirect('/');
      }
    });
});

////////////* Sign-in *////////////
router.post('/sign-in', function (req, res, next) {

  userModel.findOne(
    { email: req.body.emailFromFront.toLowerCase(),
      password: req.body.passwordFromFront}, function (error, user) {
      if (user) {
        req.session.user = user;
        res.redirect('/villes');
        console.log("user", user);
      } else {
        res.redirect('/');
      }
      });
});
////////////* Logout *////////////
router.get('/logout', function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
});


module.exports = router;
