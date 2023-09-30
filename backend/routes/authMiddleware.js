const isAuth = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    res.status(401).json({msg: "User not authenticated"});
  }
}

module.exports = isAuth