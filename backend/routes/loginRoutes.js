const express = require('express');
const router = express.Router();
const passport = require('passport')
const db = require("../models")
const { genPassword } = require("../lib/passwordUtils")

// router.post('/login', passport.authenticate('local', {
//   failureRedirect: '/login', 
//   failureMessage: true
// }), function(req, res) {
//     console.log("/login cb function")
//     let firstName = req.session.passport.user.firstName
//     res.redirect(`/${firstName}`)
// });

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: `login-success`})); //todo can I put the req.session...for firstName here???

router.post("/register", async (req, res) => {
  try{

    let {firstName, email, password} = req.body

    // hash password
    let { salt, hash } = genPassword(password)

    // save form info to db
    await db.users.create({
      firstName,
      email,
      hash,
      salt
    })

    // on success, redirect user to login page
    res.redirect('/login')
  }
  catch(error){
    // on error, console.log error and send error to frontend
    console.log('error: ', error)
    res.status(500).json(error)
  }
  
})

router.get("/logout", (req, res) => {
  req.session = null
  if(!req.session){
    console.log("logout successful")
    res.json('logout successful')
  }
  else{
    console.log('logout failed')
    res.json('logout failed')
  }
})

module.exports = router;