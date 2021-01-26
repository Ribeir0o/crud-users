const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

const sign = async (payload) => {
  const token = await jwt.sign(payload, secret, { expiresIn: "12h" });
  return token;
};

const verify = async (token) => {
  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (e) {
    return false;
  }
};
module.exports = {
  sign,
  verify,
};
