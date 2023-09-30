const crypto = require("crypto");

function genPassword(password){
  let salt = crypto.randomBytes(32).toString("hex");
  let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return {salt, hash};
}

function validPassword(password, hash, salt){
  let newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  return hash === newHash;
}

module.exports = {validPassword, genPassword}
// module.exports.validPassword = validPassword;
// module.exports.genPassword = genPassword;