const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isLoggedIn: req.session.isLoggedIn,

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
  User.findOne({email: req.body.email, password: req.body.password})
    .then(user => {
      if(!user){
        return res.redirect('/login');
      }
      console.log("user is:", user);
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        req.session.isLoggedIn = true;
        res.redirect('/');
      });
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
