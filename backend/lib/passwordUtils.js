const crypto = require("crypto");

function genPassword(password){
  let salt = crypto.randomBytes(32).toString("hex");
  let hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

  console.log('salt', salt);
  console.log("hash", hash);

  return {salt, hash};
}

function validPassword(password, hash, salt){
  console.log("password", password);
  console.log('validPassword salt', salt);
  console.log("hash", hash);
  let newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
  console.log("newHash", newHash);
  return hash === newHash;
}

module.exports = {validPassword, genPassword}
// module.exports.validPassword = validPassword;
// module.exports.genPassword = genPassword;