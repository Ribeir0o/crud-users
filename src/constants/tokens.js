const { sign } = require("../lib/jwt");

async function genTokens() {
  const admin = await sign({ email: "random@random.com", role: 1 });
  const normalUser = await sign({ email: "normal@normal.com", role: 0 });
  return { admin, normalUser };
}

module.exports = genTokens;
