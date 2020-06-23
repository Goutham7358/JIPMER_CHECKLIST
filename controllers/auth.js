const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  let errorMessage = req.flash('error');
  console.log(errorMessage);
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: req.session.isLoggedIn,
    errorMessage,
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  User.findOne({ email: req.body.email }).then((user) => {
    if (!user) {
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
    }
    bcrypt.compare(req.body.password, user.password).then((doMatch) => {
      if (doMatch) {
        console.log('user is:', user);
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
          console.log(err);
          req.session.isLoggedIn = true;
          res.redirect('/');
        });
      }
      else{
        req.flash('error', 'Invalid email or password.');
      return res.redirect('/login');
      }
      
    }).catch(err => console.log(err));
  }) .catch(err => console.log(err));
  
};

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect('/');
  });
};
