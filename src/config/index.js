/* eslint-disable no-undef */
require("dotenv").config();

const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  jwt_secret: process.env.JWT_ACCESS_TOKEN_SECRET,
  tokenHeaderKey:process.env.TOKEN_HEADER_KEY,
};

module.exports = config;
