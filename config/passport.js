const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
 // Load User model
 const User = require('../models/user');


 
module.exports = (passport) => {
 
   passport.use(
     new LocalStrategy({
       usernameField: 'email', passwordField: 'password'
     }, (email, password, done) => {
       // Match user
       User.findOne({
         email: email
       }).then(user => {
         if (!user) {
           return done(null, false, {message: req.flash('error','incorrect email') });
         }

         // Match password
         bcrypt.compare(password, user.password, (err, isMatch) => {
           if (err)
             throw err;
           if (isMatch) {
             return done(null, user, {message: 'you are logged in'});
           } else {
             return done(null, false, {message: 'incorrect password'});
           }

         });
       })
         .catch()
     })

  );
  
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
      
    });
  });
  




   
 };