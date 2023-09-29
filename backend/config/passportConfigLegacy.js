const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const db = require('../models');

const init = (passport) => {
  // passport logic here
  // passport.use called to register strategy
  passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => {
    try{
      // take form data and validate user
      let records = await db.users.findAll({where: {email}})

      if(records){
        // a user was found in db
        records = records[0]

        bcrypt.compare(password, records.password, (err, match) => {

          if(match){
            console.log('password matched')
            return done(null, records)
          }
          else{
            console.log("password didn't match")
            return done(null, false, {message: "Incorrect username or password."})
          }

        })

      }
      else{
        // no user in db
        return done(null, false, {message: "Email not found."})
      }
    }
    catch(err){
      return done(err)
    }

  }))

  passport.serializeUser((user, done) => {
    console.log('serializing user')
    done(null, {
      firstName: user.firstName,
      email: user.email,
      userID: user.id
    }) // second argument is what we want on the session
  })

  // check if user is valid
  // grabbing session data from user cookie and decoding cookie with secret and being passed data (id)
  passport.deserializeUser(async (sessionObj, done) => {
    console.log('inside deserializeUser')
    try{
      
      let foundUserInDBFromSessionData = await db.users.findByPk(sessionObj.id);

      if(foundUserInDBFromSessionData){
        done(null, foundUserInDBFromSessionData)
      }
      else{
        done(null, false)
      }

    }
    catch(error){
      console.log('error', error);
    }
  }) 
}

module.exports = init