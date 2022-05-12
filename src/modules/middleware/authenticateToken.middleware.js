const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { generateAccessToken, generateRefreshToken } = require('./generateTokens.middleware');
const { getUserById, updateUsersRefreshToken, deleteUsersRefreshToken } = require('../../db/requests');
dotenv.config();

module.exports.authenticateToken = (req, res, next) => {
  try {
    const accesstoken = req.headers.accesstoken;
    const refreshtoken = req.headers.refreshtoken;
    if (accesstoken == null || refreshtoken == null) return res.status(403).send("User don't authenticate");

    if (accesstoken) {
      jwt.verify(accesstoken, process.env.TOKEN, (err, user) => {
        if (err) {
          if (err.message === "jwt expired") {
            return jwt.verify(refreshtoken, process.env.TOKEN, async (err, user) => {
              if (err.message === "jwt expired") {
                const data = jwt.decode(refreshtoken);
                deleteUsersRefreshToken(data.id);
              }
              if (err) return res.status(403).send("Refresh token not validate");
              const userRow = await getUserById(user.id);
              if (userRow.refreshtoken !== refreshtoken) {
                deleteUsersRefreshToken(user.id);

                return res.status(403).send("Refresh token not validate");
              };
              const accesstokenNew = generateAccessToken({ id: user.id });
              const refreshtokenNew = generateRefreshToken({ id: user.id });
              updateUsersRefreshToken(user.id, refreshtokenNew);
              res.status(203).send({ accesstoken: accesstokenNew, refreshtoken: refreshtokenNew });
            });
          } else {
            res.status(403).send("Tokens not validate");
          };
        } else {
          req.user = user;

          next();
        };
      });
    };
  } catch (err) {
    return res.status(403).send({ err, message: "Tokens not validate" });
  }
};