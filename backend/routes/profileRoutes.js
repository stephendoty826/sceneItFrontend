const express = require('express');
const router = express.Router();
const db = require("../models")
const isAuth = require("./authMiddleware")

// route to add imdbID to watchlist table
router.post('/watchlist/:imdbID', async (req, res) => {
  try{
    const imdbID = req.params.imdbID;
    db.movies.create({
      userID: req.user.dataValues.id,
      imdbID
    })
    res.json("movie added to db");
  }catch(err){

  }
})

// get route to get watchlist from database (make it a portected route that will send the user to the login page if they aren't logged in)

router.get("/watchlist", isAuth, async (req, res) => {
  let userID = req.user.dataValues.id
  let watchlist = await db.movies.findAll({attributes: ["imdbID"], where: {userID}})
  res.json(watchlist)
})

module.exports = router;
