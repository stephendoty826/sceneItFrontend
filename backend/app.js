const express = require('express');
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const bcrypt = require('bcryptjs')
const passport = require('passport')
require('./auth/passportConfig')(passport)
const db = require("./models")

const app = express();
const port = 3050;

app.use(helmet());

//body parser
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieSession({
  name: 'session', 
  keys: ['keyforCookie'],
  maxAge: 14 * 24 * 60 * 60 * 1000 // 2 weeks
}))

app.use(passport.initialize())
app.use(passport.session())



app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login', 
  failureMessage: true 
}), function(req, res) {

    let firstName = req.session.passport.user.firstName
    console.log("firstName", firstName)
    res.redirect(`/${firstName}`)
  });

app.post("/register", async (req, res) => {
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

app.get("/logout", (req, res) => {
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

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})