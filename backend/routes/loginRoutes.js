const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require("../models")

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login', 
  failureMessage: true 
}), function(req, res) {

    let firstName = req.session.passport.user.firstName
    console.log("firstName", firstName)
    res.redirect(`/${firstName}`)
  });

router.post("/register", async (req, res) => {
  try{

    let {firstName, email, password} = req.body

    // encrypt password
    password = bcrypt.hashSync(password, 8)

    console.log("firstName", firstName, "email", email, "password", password)

    // save form info to db
    await db.users.create({
      firstName,
      email,
      password
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