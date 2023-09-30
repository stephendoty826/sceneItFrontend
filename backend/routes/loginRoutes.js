const express = require('express');
const router = express.Router();
const passport = require('passport')
const db = require("../models")
const { genPassword } = require("../lib/passwordUtils")

router.post('/login', passport.authenticate('local', {
  failureRedirect: '/login', 
  failureMessage: true
}), (req, res) => {
    res.redirect(`/${req.user.firstName}`)
});

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
  console.log("logout route")
  
  try{
    req.logout(() => { // req.logoug() requires a callback function per passportjs...
      console.log("logout successful")
    });
    res.json('logout successful')
  }catch(err){
    console.log('logout failed')
    res.json({msg: `logout failed: ${err}`})
  }
})

module.exports = router;