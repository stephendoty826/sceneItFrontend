const express = require('express');
const router = express.Router();
const db = require("../models")

// route to add imdbID to watchlist table
router.post('/watchlist/:imdbID', async (req, res) => {
  const imdbID = req.params.imdbID;
  console.log(req.session)
  // db.movies.create({
  //   userID,
  //   imdbID
  // })
  res.send("hello world");
})

module.exports = router;
