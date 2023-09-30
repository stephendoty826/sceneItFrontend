const express = require('express');
const router = express.Router();
const db = require("../models")
const isAuth = require("./authMiddleware")

// get route to query database for movies on watchlist
router.get("/watchlist", isAuth, async (req, res) => {
  let userID = req.user.dataValues.id
  let watchlist = await db.movies.findAll({attributes: ["imdbID"], where: {userID}})
  res.json(watchlist)
})

// post route to add imdbID to movies table
router.post('/watchlist/:imdbID', async (req, res) => {
  try{
    const imdbID = req.params.imdbID;
    db.movies.create({
      userID: req.user.dataValues.id,
      imdbID
    })
    res.json("movie added to db");
  }catch(err){
    res.json({err, msg: "error while adding movie to database"});
  }
})

// delete route to delete movie from movies table
router.delete("/watchlist/:imdbID", async (req, res) => {
  try{
    let imdbID = req.params.imdbID;
    await db.movies.destroy({where: {imdbID, userID: req.user.dataValues.id}})
    res.json({msg: "movie deleted from from database"})
  }catch(err){
    res.json({err, msg: "error while deleting movie from database"});
  }
})


module.exports = router;
