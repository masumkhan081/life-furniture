const jwt = require("jsonwebtoken");

function createToken(payload, secret, expireTime) {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
}

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

module.exports = { createToken, verifyToken };
