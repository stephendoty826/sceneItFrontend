require("dotenv").config()

module.exports = {
  development: {
    username: "cdsmdttf",
    password: process.env.DB_PASSWORD,
    database: "cdsmdttf",
    host: "berry.db.elephantsql.com",
    dialect: "postgres",
  },
};
