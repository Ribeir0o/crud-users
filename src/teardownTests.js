const db = require('../db/index');

module.exports = async () => {
  await db.destroy();
};
