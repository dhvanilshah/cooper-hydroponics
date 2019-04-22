const jwt = require("jsonwebtoken");
const models = require("./models");

async function verifyUserToken(token, secret) {
  const decoded = jwt.verify(token, secret);
  const userId = decoded.userId;
  const user = await models.User.findOne({ _id: userId });
  return user;
}

module.exports = {
  verifyUserToken
};
