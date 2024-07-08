const jwt = require("jsonwebtoken");

export function createToken(payload, secret, expireTime) {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
}

export function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}
