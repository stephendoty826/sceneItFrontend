const express = require('express');
const router = express.Router();
const db = require("../models")
const isAuth = require("./authMiddleware")

// route to add imdbID to watchlist table
router.post('/watchlist/:imdbID', async (req, res) => {
  const imdbID = req.params.imdbID;
  db.movies.create({
    userID: req.user.dataValues.id,
    imdbID
  })
  res.send("hello world");
})

// get route to get watchlist from database (make it a portected route that will send the user to the login page if they aren't logged in)

// router.get("/watchlist", isAuth, (req, res) => {
//   console.log('watchlist get route')
//   res.json("hello world")
// })

module.exports = router;
