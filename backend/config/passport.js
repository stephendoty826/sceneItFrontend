const passport = require("passport");
const LocalStrategy = require('passport-local');
const { users } = require('../models');
const { validPassword } = require("../lib/passwordUtils")

const customFields = {
  usernameField: "email",
}

const verifyCallback = (email, password, done) => {
  users.findOne({where: { email }})
    .then(user => {
      
      if (!user){ // if no user is found in db
        console.log("No user found in db")
        return done(null, false)
      }

      const isValid = validPassword(password, user.hash, user.salt);

      if(isValid){
        console.log("Valid password")
        return done(null, user)
      }
      else{
        console.log('Not valid password')
        return done(null, false)
      }
    })
    .catch(err => {
      done(err)
    })
} 

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log("user serialized: userId added to req.session")
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log("user deserialized: user added to req.user")
  users.findByPk(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
})