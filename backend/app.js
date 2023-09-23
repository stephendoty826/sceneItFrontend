const express = require('express');
const helmet = require('helmet')
const cookieSession = require('cookie-session')
const passport = require('passport')
require('./auth/passportConfig')(passport)

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

app.use(require('./routes/loginRoutes'))
app.use(require('./routes/profileRoutes'))

app.listen(port, ()=> {
  console.log(`Server running on port ${port}`)
})