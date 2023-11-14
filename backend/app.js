const express = require("express");

const session = require("express-session");
const Sequelize = require("sequelize");
// initialze sequelize with session store
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const passport = require("passport");

const helmet = require("helmet");

const port = 3050;

/**
 * -------------- GENERAL SETUP ----------------
 */

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require("dotenv").config();

const app = express();

app.use(helmet());

//body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * ----------------- SESSION SETUP -------------------
 */

// create database
const sequelize = new Sequelize("sceneItFullStack", "postgres", null, {
  dialect: "postgres",
  host: "127.0.0.1",
});

// Define a model for your session table
const sessionData = sequelize.define("sessionData", {
  sid: {
    type: Sequelize.STRING,
    primaryKey: true,
  },
  data: Sequelize.TEXT,
  expires: Sequelize.DATE,
});

const sessionStore = new SequelizeStore({
  db: sequelize,
  table: "sessionData",
});

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14, // equals 14 days
    },
  })
);

// sessionStore.sync() will create/sync the db table
sessionStore.sync();

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

// Need to require the entire Passport config module so app.js knows about it
require("./config/passport");

app.use(passport.initialize());
app.use(passport.session());

/**
 * -------------- ROUTES ----------------
 */

// importing routes
app.use(require("./routes/loginRoutes"));
app.use(require("./routes/profileRoutes"));

/**
 * -------------- SERVER ----------------
 */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
