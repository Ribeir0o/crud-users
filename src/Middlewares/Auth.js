const jwt = require("../lib/jwt");

module.exports = async (req, res, next) => {
  const authToken = req.headers["authorization"];

  if (!authToken) return res.sendStatus(401);
  const token = authToken.split(" ")[1];
  const payload = await jwt.verify(token);
  if (!payload) return res.sendStatus(401);
  if (!payload.role) return res.sendStatus(403);
  next();
};
