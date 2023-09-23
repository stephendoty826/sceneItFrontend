const express = require('express');
const router = express.Router();
const db = require("../models")

// route to add imdbID to watchlist table
router.post('/addMovie', async (req, res) => {
  console.log("inside addMovie")
})

module.exports = router;
